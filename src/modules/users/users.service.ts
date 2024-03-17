import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { In, Repository } from 'typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateAdminAndOrgDto, CreateEmployeeDto, FindUserByIdAndRoleDto } from './users.dtos';
import { Skill } from '../skills/skill.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private organizationsService: OrganizationsService,
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

  async updateUserRole(userId: number, newRole: UserRole) {
    return await this.usersRepository.update(userId, { role: newRole });
  }

  async assignUserRole(userId: number, role: UserRole) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    user.role = role;
    return await this.usersRepository.save(user);
  }

  async findUserByIdAndRole(data: FindUserByIdAndRoleDto) {
    return await this.usersRepository.findOne({
      where: {
        id: data.userId,
        role: data.role,
        organization: { id: data.organizationId },
      },
      relations: ['organization'],
    });
  }

  async updateUserSkills(userId: number, skill: Skill[]) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['skills'],
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.skills = skill;
    await this.usersRepository.save(user);
    return user;
  }

  async findUserById(userId: number) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['organization'],
    });
  }
}
