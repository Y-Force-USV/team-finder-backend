import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Organization } from '../organizations/organization.entity';
import { SkillCategory } from '../skill-category/skill-category.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => SkillCategory, (category) => category.skills, { eager: true })
  category: SkillCategory;

  @ManyToMany(() => User)
  @JoinTable({ name: 'author_id' })
  users: User;

  @ManyToMany(() => Department, (department) => department.skills)
  @JoinTable({
    name: 'department_skills',
    joinColumn: { name: 'skill_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'department_id', referencedColumnName: 'id' },
  })
  departments: Department[];

  @ManyToOne(() => Organization)
  @JoinTable({ name: 'organization_id' })
  organization: Organization;
}
