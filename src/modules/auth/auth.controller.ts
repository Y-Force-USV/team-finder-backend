import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateAdminAndOrgDto, CreateEmployeeDto, LoginAdminDto } from '../users/users.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createAdminAndOrg(@Body() data: CreateAdminAndOrgDto) {
    return await this.authService.createAdminAndOrg(data);
  }

  @Post('register/:organizationId')
  async createEmpolyee(
    @Body() data: CreateEmployeeDto,
    @Param('organizationId', ParseIntPipe) organizationId: number,
  ) {
    return await this.authService.createEmployee(data, organizationId);
  }

  @Post('login')
  async login(@Body() data: LoginAdminDto) {
    return await this.authService.login(data);
  }
}
