import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { ProjectRole } from '../project-roles/project-roles.entity';
import { User } from '../users/user.entity';

export enum ProjectPeriod {
  FIXED = 'fixed',
  ONGOING = 'ongoing',
}

export enum ProjectStatus {
  NOT_STARTED = 'not_started',
  STARTING = 'starting',
  IN_PROGRES = 'in_progres',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProjectPeriod,
  })
  project_period: ProjectPeriod;

  @Column()
  start_date: string;

  @Column({ nullable: true })
  deadline_date: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  status: ProjectStatus;

  @Column()
  technology_stack: string;

  @Column()
  description: string;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;

  @OneToMany(() => ProjectRole, (projectRole) => projectRole.project)
  teamRoles: ProjectRole[];

  @ManyToOne(() => User, (user) => user.projects)
  projectManager: User;
}
