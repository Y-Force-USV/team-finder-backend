import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Organization } from '../organizations/organization.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.skills)
  users: User[];

  @ManyToOne(() => Department, (department) => department.skills)
  department: Department;

  @ManyToOne(() => Organization, (organization) => organization.skillCategory)
  organization: Organization;
}
