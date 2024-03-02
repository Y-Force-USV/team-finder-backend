import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    name: string,
    address: string,
  ): Promise<Organization> {
    const newOrganization = this.organizationRepository.create({
      name,
      address,
    });

    await this.organizationRepository.save(newOrganization);
    return newOrganization;
  }
}
