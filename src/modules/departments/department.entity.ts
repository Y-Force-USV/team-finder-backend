import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.departments)
  organization: Organization;

  @ManyToOne(() => User)
  users: User;

  @OneToMany(() => Skill, (skill) => skill.department)
  skills: Skill[];
}
