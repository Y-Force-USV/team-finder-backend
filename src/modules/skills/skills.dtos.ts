import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignSkillsDto {
  skills: string[];
}

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  departmentId: number;
}
