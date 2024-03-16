import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from './projects.dtos';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async createProject(userId: number, data: CreateProjectDto) {
    const user = await this.usersService.findUserById(userId);

    if (!user || user.role !== UserRole.PROJECT_MANAGER) {
      throw new UnauthorizedException('Only Project Managers can create projects.');
    }

    const project = this.projectRepository.create({
      ...data,
      organization: user.organization,
      projectManager: user,
    });
    await this.projectRepository.save(project);
    return project;
  }

  async updateProject(userId: number, projectId: number, updateData: UpdateProjectDto) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !(user.role === UserRole.PROJECT_MANAGER || user.role === UserRole.ADMIN)) {
      throw new UnauthorizedException('You are not authorized to update this project.');
    }
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    Object.assign(project, updateData);
    await this.projectRepository.save(project);
    return project;
  }

  async deleteProject(userId: number, projectId: number) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !(user.role === UserRole.PROJECT_MANAGER || user.role === UserRole.ADMIN)) {
      throw new UnauthorizedException('You are note to authorized to delete this project.');
    }

    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    if (
      project.status === ProjectStatus.IN_PROGRES ||
      project.status === ProjectStatus.CLOSING ||
      project.status === ProjectStatus.CLOSED
    ) {
      throw new UnauthorizedException('Project cannot be deleted in its current state.');
    }
    await this.projectRepository.remove(project);
  }

  async findProjectById(projectId: number) {
    return await this.projectRepository.findOneBy({ id: projectId });
  }
}
