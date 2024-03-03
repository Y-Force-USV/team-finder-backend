import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminAndOrgDto, CreateEmployeeDto } from './users.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createEmpolyee(@Body() data: CreateEmployeeDto) {
    return await this.usersService.createEmployee(data);
  }

  @Post('admin')
  async createAdminAndOrg(@Body() data: CreateAdminAndOrgDto) {
    return await this.usersService.createAdminAndOrg(data);
  }

  @Get()
  async findUsers() {
    return await this.usersService.findUsers();
  }
}
