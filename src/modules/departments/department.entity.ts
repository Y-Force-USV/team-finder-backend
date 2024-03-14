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

  @ManyToOne(() => User)
  @JoinTable({
    name: 'department_members',
    joinColumn: { name: 'department_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  members: User[];
}
