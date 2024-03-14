import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './departments.dtos';
import { UserRole } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { FindUserByIdAndRoleDto } from '../users/users.dtos';

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
}
