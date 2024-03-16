import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateProjectDto, UpdateProjectDto } from './projects.dtos';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.PROJECT_MANAGER)
  async createProject(@Req() request, @Body() data: CreateProjectDto) {
    const userId = request.user.id;
    return await this.projectsService.createProject(userId, data);
  }

  @Post(':projectId')
  async updateProject(
    @Req() request,
    @Param('projectId') projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const userId = request.user.id;
    return this.projectsService.updateProject(userId, projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async deleteProject(@Req() request, @Param('projectId') projectId: number) {
    const userId = request.user.id;
    return this.projectsService.deleteProject(userId, projectId);
  }
}
