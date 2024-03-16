import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
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

  @IsOptional()
  organizationId?: number;
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

export class SearchEmployeesDto {
  @IsOptional()
  @IsBoolean()
  includePartiallyAvailable: boolean;

  @IsOptional()
  @IsBoolean()
  includeProjectsCloseToFinish: boolean;

  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(6)
  weeksUntilDeadline: number;

  @IsOptional()
  @IsBoolean()
  includeUnavailableEmployees: boolean;

  @IsOptional()
  technologyStack: string[];
}

export class ProjectDisplayDto {
  @IsString()
  name: string;

  @IsString()
  roles: string[];

  @IsString()
  technologyStack: string[];
}
