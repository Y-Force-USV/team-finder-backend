import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { In, Repository } from 'typeorm';
import { CreateDepartmentDto } from './departments.dtos';
import { User, UserRole } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createDepartmentByAdmin(data: CreateDepartmentDto, adminUserId: number) {
    const adminUser = await this.userRepository.findOne({
      where: {
        id: adminUserId,
        role: In([UserRole.ADMIN]),
        organization: { id: data.organizationId },
      },
    });

    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to create departments.');
    }

    const organization = await this.organizationRepository.findOneBy({ id: data.organizationId });
    if (!organization) {
      throw Error('Organization not found.');
    }

    const department = await this.departmentRepository.create({
      name: data.name,
      organization,
    });
    return await this.departmentRepository.save(department);
  }
}
