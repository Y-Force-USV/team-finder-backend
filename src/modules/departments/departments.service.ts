import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentByAdminDto } from './departments.dtos';
import { UserRole } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { FindUserByIdAndRoleDto } from '../users/users.dtos';
import { markAsUntransferable } from 'worker_threads';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
  ) {}

  async createDepartmentByAdmin(data: CreateDepartmentDto, adminUserId: number) {
    const findUserDto: FindUserByIdAndRoleDto = {
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: data.organizationId,
    };
    const adminUser = await this.usersService.findUserByIdAndRole(findUserDto);
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to create departments.');
    }

    const organization = await this.organizationsService.findOrganizationById(data.organizationId);
    if (!organization) {
      throw Error('Organization not found.');
    }

    const department = this.departmentRepository.create({
      name: data.name,
      organization,
    });
    return await this.departmentRepository.save(department);
  }

  async findDepartmentById(id: number) {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    return department;
  }

  async updateDepartment(data: UpdateDepartmentByAdminDto) {
    const { adminUserId, departmentId, name } = data;

    const department = await this.departmentRepository.findOneBy({ id: departmentId });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    const adminUser = await this.usersService.findUserByIdAndRole({
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: department.organization.id,
    });
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to update this department.');
    }

    if (name) department.name = name;
    await this.departmentRepository.save(department);
    return department;
  }

  async deleteDepartament(adminUserId: number, departmentId: number) {
    const department = await this.departmentRepository.findOneBy({ id: departmentId });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }

    const adminUser = await this.usersService.findUserByIdAndRole({
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: department.organization.id,
    });
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to delete this department.');
    }
    await this.departmentRepository.remove(department);
  }

  async assignDepartmentManager(departmentId: number, managerUserId: number, organizationId) {
    const manager = await this.usersService.findUserByIdAndRole({
      userId: managerUserId,
      role: UserRole.DEPARTMENT_MANAGER,
      organizationId: organizationId,
    });
    if (!manager) {
      throw new NotFoundException('Manager with given ID not found or not a department manager.');
    }
    const department = await this.departmentRepository.findOneBy({ id: departmentId });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }

    department.manager = manager;
    await this.departmentRepository.save(department);
    return department;
  }

  async addMemberToDepartmetnt(departmentId: number, userId: number) {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
      relations: ['members'],
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    department.members.push(user);
    await this.departmentRepository.save(department);
    return department;
  }

  async removeMemberFromDepartment(departmentId: number, userId: number) {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
      relations: ['members'],
    });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    department.members = department.members.filter((member) => member.id !== userId);
    await this.departmentRepository.save(department);
    return department;
  }
}
