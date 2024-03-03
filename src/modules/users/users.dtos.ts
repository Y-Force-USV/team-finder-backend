import { IsEmail, IsString, IsStrongPassword, Max } from 'class-validator';

export class CreateAdminAndOrgDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
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

  @IsStrongPassword()
  password: string;

  organizationId: number;
}
