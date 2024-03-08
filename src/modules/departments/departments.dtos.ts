import { IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  departmentManagerId: number;
}
