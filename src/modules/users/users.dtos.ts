import { IsEmail, IsNumber, IsString, IsStrongPassword, Max } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateAdminAndOrgDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  orgName: string;

  @IsString()
  orgAddress: string;
}

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  organizationId: number;
}

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class FindUserByIdAndRoleDto {
  @IsNumber()
  userId: number;

  @IsString()
  role: UserRole;

  @IsNumber()
  organizationId: number;
}
