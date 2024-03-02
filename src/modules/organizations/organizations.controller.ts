import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { IsString } from 'class-validator';

class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}

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
