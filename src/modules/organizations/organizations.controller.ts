import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizations.dtos';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  findOrganizations() {
    return this.organizationsService.findOrganizations();
  }

  @Post()
  createOrganization(@Body() data: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(data.name, data.address);
  }
}
