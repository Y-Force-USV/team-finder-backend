import { IsNumber, IsString } from 'class-validator';

export class CreateSkillCategoryDto {
  @IsString()
  categoryName: string;

  @IsNumber()
  organizationId: number;
}
