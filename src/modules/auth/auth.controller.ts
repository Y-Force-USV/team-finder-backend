import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginAdminDto } from '../users/users.dtos';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('login')
  async login(@Body() data: LoginAdminDto) {
    const user = await this.userService.validateUser(data);
    console.log('user:', user);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const { password, ...result } = user;
    return result;
  }
}
