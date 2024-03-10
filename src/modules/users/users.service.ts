import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { In, Repository } from 'typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateAdminAndOrgDto, CreateEmployeeDto, LoginAdminDto } from './users.dtos';
import { Skill } from '../skills/skill.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private organizationsService: OrganizationsService,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    organization: any,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.usersRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
      organization,
    });
    return user;
  }

  async createAdminAndOrg(data: CreateAdminAndOrgDto) {
    const organization = await this.organizationsService.createOrganization(
      data.orgName,
      data.orgAddress,
    );
    const admin = await this.createUser(
      data.name,
      data.email,
      data.password,
      UserRole.ADMIN,
      organization,
    );
    return admin;
  }

  async validateUser(data: LoginAdminDto) {
    const user = await this.usersRepository.findOne({ where: { email: data.email } });

    console.log('dbuser: ', user);
    if (!user) {
      return null;
    }

    console.log(await bcrypt.hash(data.password, 12));
    console.log(data.password);
    const isMatch = await bcrypt.compare(data.password, user.password);

    console.log('isMatch: ', isMatch);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async createEmployee(data: CreateEmployeeDto) {
    const organization = await this.organizationsService.findOrganizationById(data.organizationId);

    const employee = await this.createUser(
      data.name,
      data.email,
      data.password,
      UserRole.EMPLOYEE,
      organization,
    );

    return employee;
  }

  async findUsers() {
    return await this.usersRepository.find({ relations: { organization: true } });
  }

  async assignSkills(userId: number, skillNames: string[]) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['skills'],
    });

    const existingSkills = await this.skillRepository.find({ where: { name: In(skillNames) } });

    const newSkillNames = skillNames.filter(
      (name) => !existingSkills.find((skill) => skill.name === name),
    );
    const newSkills = this.skillRepository.create(newSkillNames.map((name) => ({ name })));

    await this.skillRepository.save(newSkills);

    user.skills = [...user.skills, ...existingSkills, ...newSkills];
    await this.usersRepository.save(user);
    return user;
  }

  async updateUserRole(userId: number, newRole: UserRole) {
    return await this.usersRepository.update(userId, { role: newRole });
  }
}
