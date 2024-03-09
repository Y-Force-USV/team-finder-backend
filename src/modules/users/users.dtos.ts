import { IsEmail, IsString, IsStrongPassword, Max } from 'class-validator';

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
