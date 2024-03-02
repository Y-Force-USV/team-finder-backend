import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.services';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post('/create')
  createOrganization(@Body() body: any) {
    return this.organizationService.createOrganization(body.name, body.address);
  }
}
