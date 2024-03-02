import { IsEmail, IsString, Max } from 'class-validator';

export class CreateAdminAndOrgDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  password: string;
  orgName: string;
  orgAddress: string;
}
