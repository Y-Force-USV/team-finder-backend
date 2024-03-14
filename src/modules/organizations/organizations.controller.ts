import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizations.dtos';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  findOrganizations() {
    return this.organizationsService.findOrganizations();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  createOrganization(@Body() data: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(data.name, data.address);
  }
}
