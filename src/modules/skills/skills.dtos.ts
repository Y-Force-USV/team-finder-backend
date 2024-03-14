import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssignSkillsDto {
  skills: string[];
}

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;
}

export class UpdateSkillDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
