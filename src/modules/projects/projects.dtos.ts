import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ProjectPeriod {
  FIXED = 'fixed',
  ONGOING = 'ongoing',
}

export enum ProjectStatus {
  NOT_STARTED = 'not_started',
  STARTING = 'starting',
}

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(ProjectPeriod)
  projectPeriod: ProjectPeriod;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ValidateIf((o) => o.projectPeriod === ProjectPeriod.FIXED)
  @IsNotEmpty()
  @IsString()
  deadlineDate: string;

  @IsEnum(ProjectStatus)
  staus: ProjectStatus;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString({ each: true })
  technologyStack: string[];

  @ValidateNested({ each: true })
  @Type(() => ProjectRoleDto)
  teamRoles: ProjectRoleDto[];
}

class ProjectRoleDto {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  quantity: number;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProjectPeriod)
  projectPeriod?: ProjectPeriod;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ValidateIf((o) => o.projectPeriod === ProjectPeriod.FIXED)
  @IsOptional()
  @IsDate()
  deadlineDate?: Date;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologyStack?: string[];
}
