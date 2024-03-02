import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Department } from '../departments/department.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[];

  @OneToMany(() => Department, (department) => department.organization)
  departments: Department[];
}
