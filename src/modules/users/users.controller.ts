import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminAndOrgDto, CreateEmployeeDto } from './users.dtos';
import { AssignSkillsDto } from '../skills/skills.dtos';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createEmpolyee(@Body() data: CreateEmployeeDto) {
    return await this.usersService.createEmployee(data);
  }

  @Get()
  async findUsers() {
    return await this.usersService.findUsers();
  }

  @Post('admin')
  async createAdminAndOrg(@Body() data: CreateAdminAndOrgDto) {
    return await this.usersService.createAdminAndOrg(data);
  }

  @Post('assign-skills')
  async assignSkills(@Req() request, @Body() data: AssignSkillsDto) {
    const userId = request.user.id;
    return await this.usersService.assignSkills(userId, data.skills);
  }

  @Patch(':id/role')
  async updateUserRole(@Param('id') userId: number, @Body('role') newRole: UserRole) {
    return this.usersService.updateUserRole(userId, newRole);
  }
}
