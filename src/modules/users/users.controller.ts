import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminAndOrgDto } from './users.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('admin')
  async createAdminAndOrg(@Body() data: CreateAdminAndOrgDto) {
    return await this.usersService.createAdminAndOrg(data);
  }

  @Get()
  async findUsers() {
    return await this.usersService.findUsers();
  }
}
