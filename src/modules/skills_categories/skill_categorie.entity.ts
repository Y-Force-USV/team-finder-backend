import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills_categories')
export class SkillCategories {
  @PrimaryGeneratedColumn()
  id: number;
}
