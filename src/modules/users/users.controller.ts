import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { SearchEmployeesDto } from './users.dtos';

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

  @Post('search-available')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.PROJECT_MANAGER)
  async searchAvailableEmployees(@Body() searchEmployeesDto: SearchEmployeesDto) {
    return await this.usersService.searchAvailableEmployees(searchEmployeesDto);
  }
}
