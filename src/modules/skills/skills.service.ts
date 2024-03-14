import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { In, Repository } from 'typeorm';
import { CreateSkillDto, UpdateSkillDto } from './skills.dtos';
import { DepartmentsService } from '../departments/departments.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
import { SkillsCategoryService } from '../skill-category/skills-category.service';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private skillsCategoryService: SkillsCategoryService,
    private departmentsService: DepartmentsService,
    private usersService: UsersService,
  ) {}

  async createSkill(userId: number, data: CreateSkillDto): Promise<Skill> {
    const user = await this.usersService.findUserById(userId);
    if (!user || user.role !== UserRole.DEPARTMENT_MANAGER) {
      throw new UnauthorizedException('Only department managers can create skills.');
    }

    const category = await this.skillsCategoryService.findSkillCategoryById(data.categoryId);
    if (!category) {
      throw new NotFoundException('Skill category not found.');
    }

    const skill = this.skillRepository.create({
      ...data,
      users: user,
      category,
    });
    await this.skillRepository.save(skill);
    return skill;
  }

  async addSkillToDepartment(userId: number, skillId: number, departmentId: number) {
    const user = await this.usersService.findUserById(userId);
    if (!user || user.role !== UserRole.DEPARTMENT_MANAGER) {
      throw new UnauthorizedException('Only department manager can add skills to department.');
    }

    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['departments'],
    });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const existingAssociation = skill.departments.find((dep) => dep.id === departmentId);
    if (existingAssociation) {
      const department = await this.departmentsService.findDepartmentById(departmentId);
      if (!department) {
        throw new NotFoundException('Department not found.');
      }
      skill.departments = [...skill.departments, department];
      await this.skillRepository.save(skill);
    }
    return skill;
  }

  async updateSkill(userId: number, skillId: number, updateData: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['author'],
    });
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }
    if (skill.users.id !== userId) {
      throw new UnauthorizedException('You can only update skills you have created.');
    }

    Object.assign(skill, updateData);
    await this.skillRepository.save(skill);
    return skill;
  }

  async deleteSkill(userId: number, skillId: number) {
    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['author'],
    });
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }
    if (skill.users.id !== userId) {
      throw new UnauthorizedException('You can only delete skils you have created');
    }

    await this.skillRepository.remove(skill);
  }

  async assignSkills(userId: number, skillNames: string[]) {
    const existingSkills = await this.skillRepository.find({ where: { name: In(skillNames) } });

    const newSkillNames = skillNames.filter(
      (name) => !existingSkills.find((skill) => skill.name === name),
    );
    const newSkills = this.skillRepository.create(newSkillNames.map((name) => ({ name })));

    await this.skillRepository.save(newSkills);
    const allSkills = [...existingSkills, ...newSkills];
    const user = await this.usersService.updateUserSkills(userId, allSkills);

    return user;
  }
}
