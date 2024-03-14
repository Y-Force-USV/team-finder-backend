import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async createOrganization(name: string, address: string): Promise<Organization> {
    const newOrganization = await this.organizationsRepository.save({
      address,
      name,
    });
    return newOrganization;
  }

  async findOrganizations() {
    return await this.organizationsRepository.find({ relations: { users: true } });
  }

  async findOrganizationById(id: number) {
    return await this.organizationsRepository.findOneBy({ id });
  }
}
