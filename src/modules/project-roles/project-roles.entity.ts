import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('project_roles')
export class ProjectRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  qunatity: number;

  @ManyToOne(() => Project, (project) => project.teamRoles)
  project: Project;
}
