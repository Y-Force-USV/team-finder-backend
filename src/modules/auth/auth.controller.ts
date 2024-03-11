import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginAdminDto } from '../users/users.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginAdminDto) {
    const user = await this.authService.validateUser(data);
    console.log('user:', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.generateJWT(user);
    return { access_token: token };
  }
}
