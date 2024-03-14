import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';

@Entity('skills-categories')
export class SkillCategory {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @ManyToOne(() => Organization, (organization) => organization.skillCategory)
  organization: Organization;
}
