import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post('/createAdmin')
  createAdmin(@Body() body: any) {
    return this.userServices.createAdmin(
      body.name,
      body.email,
      body.password,
      body.organization_id,
    );
  }
}
