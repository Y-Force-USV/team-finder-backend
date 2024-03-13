import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { In, Repository } from 'typeorm';
import { CreateSkillDto } from './skills.dtos';
import { SkillCategory } from '../skill-category/skill-category.entity';
import { CreateSkillCategoryDto } from '../skill-category/skill-category.dtos';
import { DepartmentsService } from '../departments/departments.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private departmentsService: DepartmentsService,
    private organizationsService: OrganizationsService,
    private usersService: UsersService,
    @InjectRepository(SkillCategory)
    private skillCategoryRepository: Repository<SkillCategory>,
  ) {}

  async createSkill(data: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(data);
    if (data.departmentId) {
      const department = await this.departmentsService.findDepartmentById(data.departmentId);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      skill.department = department;
    }
    await this.skillRepository.save(skill);
    return skill;
  }

  async addSkillToDepartment(data: CreateSkillDto) {
    const department = await this.departmentsService.findDepartmentById(data.departmentId);
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    let skill = await this.skillRepository.findOne({
      where: { name: data.name, department: null },
    });
    if (!skill) {
      skill = this.skillRepository.create({ name: data.name });
    }
    skill.department = department;
    await this.skillRepository.save(skill);
    return skill;
  }

  async createSkillCategory(data: CreateSkillCategoryDto) {
    const organization = await this.organizationsService.findOrganizationById(data.organizationId);
    if (!organization) {
      throw new NotFoundException('Organization not found.');
    }

    const skillCategory = this.skillCategoryRepository.create({
      category_name: data.categoryName,
      organization,
    });

    return await this.skillCategoryRepository.save(skillCategory);
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
