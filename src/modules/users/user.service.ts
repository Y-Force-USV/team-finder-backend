import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { Organization } from '../organizations/organization.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createAdmin(
    name: string,
    email: string,
    password: string,
    organization_id: number,
  ): Promise<User> {
    const organization = await this.organizationRepository.findOneBy({
      id: organization_id,
    });
    if (!organization) {
      throw new Error('Organization not found');
    }
    const newUser = this.userRepository.create({
      name,
      email,
      password,
      role: UserRole.Admin,
      organization,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
