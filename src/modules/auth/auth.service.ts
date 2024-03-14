import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { LoginAdminDto } from '../users/users.dtos';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async generateJWT(user: User) {
    const playload = { username: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(playload);
  }

  async validateUser(data: LoginAdminDto) {
    const user = await this.usersService.findUserByEmail(data.email);

    console.log('dbuser: ', user);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  }
}
