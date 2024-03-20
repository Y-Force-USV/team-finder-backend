import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { CreateAdminAndOrgDto, CreateEmployeeDto, LoginAdminDto } from '../users/users.dtos';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async generateJWT(user: User) {
    const payload = { id: user.id, role: user.role };
    console.log(process.env.JWT_SECRET_KEY);
    return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET_KEY });
  }

  async validateUser(data: LoginAdminDto) {
    const user = await this.usersService.findUserByEmail(data.email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async createAdminAndOrg(data: CreateAdminAndOrgDto) {
    const userExists = await this.usersService.findUserByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('Email is already in use');
    }
    const adminOrg = await this.usersService.createAdminAndOrg(data);
    if (!adminOrg) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateJWT(adminOrg);
    return { accesToken: token };
  }

  async createEmployee(data: CreateEmployeeDto, organizationId: number) {
    const userExists = await this.usersService.findUserByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('Email is already in use');
    }

    data.organizationId = organizationId;
    const employee = await this.usersService.createEmployee(data);
    if (!employee) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateJWT(employee);
    return { accesToken: token };
  }

  async login(data: LoginAdminDto) {
    const user = await this.validateUser(data);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateJWT(user);
    return {
      accessToken: token,
      organizationName: user.organization.name,
      userName: user.name,
      organizationId: user.organization.id,
      role: user.role,
    };
  }
}
