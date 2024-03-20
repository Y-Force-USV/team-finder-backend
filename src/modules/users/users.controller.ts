import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUsers() {
    return await this.usersService.findUsers();
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  async updateUserRole(@Param('id') userId: number, @Body('role') newRole: UserRole) {
    return this.usersService.updateUserRole(userId, newRole);
  }

  @Get('organization/:organizationId/employees')
  async getEmployeesByOrganizationId(
    @Param('organizationId', ParseIntPipe) organizationId: number,
  ) {
    return this.usersService.getEmployeesByOrganizationId(organizationId);
  }
}
