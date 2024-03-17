import { Body, Controller, Post } from '@nestjs/common';
import { InvitationsService } from './invitation.service';

@Controller('organizations')
export class InvitationController {
  constructor(private invitationsService: InvitationsService) {}

  @Post('generate-invitation')
  async generateInvitationLink(@Body('organizationId') organizationId: number) {
    return this.invitationsService.generateInvitationLink(organizationId);
  }
}
