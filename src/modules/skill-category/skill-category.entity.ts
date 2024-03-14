import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Skill } from '../skills/skill.entity';

@Entity('skills-categories')
export class SkillCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.skillCategory)
  organization: Organization;

  @OneToMany(() => Skill, (skill) => skill.category)
  skills: Skill[];
}
