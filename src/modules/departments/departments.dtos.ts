import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  departmentManagerId: number;
}

export class UpdateDepartmentByAdminDto {
  @IsNumber()
  adminUserId: number;

  @IsNumber()
  departmentId: number;

  @IsOptional()
  @IsString()
  name?: string;
}
