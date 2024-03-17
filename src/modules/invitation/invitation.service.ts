import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { v4 as uuidv4 } from 'uuid';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    private organizationService: OrganizationsService,
  ) {}

  async generateInvitationLink(organizationId: number) {
    const token = uuidv4();
    const organization = await this.organizationService.findOrganizationById(organizationId);

    const invitation = this.invitationRepository.create({
      token,
      organization,
    });

    await this.invitationRepository.save(invitation);

    const link = `http://localhost:3000/create-account/${token}`;
    return { token, link };
  }
}
