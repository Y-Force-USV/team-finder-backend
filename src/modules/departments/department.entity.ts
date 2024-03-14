import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @OneToMany(() => Skill, (skill) => skill.departments)
  skills: Skill[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'department_manager_id' })
  manager: User;

  @OneToMany(() => User, (user) => user.department)
  members: User[];
}
