import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';

export enum ProjectPeriod {
  Fixed = 'fixed',
  Ongoing = 'ongoing',
}

export enum ProjectStatus {
  NotStarted = 'not_started',
  Starting = 'starting',
  InProgres = 'in_progres',
  Closing = 'closing',
  Closed = 'closed',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  project_id: number;

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
  description: string;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;
}
