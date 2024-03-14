import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AssignSkillsDto, CreateSkillDto, UpdateSkillDto } from './skills.dtos';
import { CreateSkillCategoryDto } from '../skill-category/skills-category.dtos';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.DEPARTMENT_MANAGER)
  async createSkill(@Req() request, @Body() data: CreateSkillDto) {
    const userId = request.user.id;
    return await this.skillsService.createSkill(userId, data);
  }

  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignSkills(@Req() request, @Body() data: AssignSkillsDto) {
    const userId = request.user.id;
    return await this.skillsService.assignSkills(userId, data.skills);
  }

  @Put(':skillId')
  @UseGuards(JwtAuthGuard)
  async updateSkill(
    @Req() request,
    @Param('skillId') skillId: number,
    @Body() updateData: UpdateSkillDto,
  ) {
    const userId = request.user.id;
    return await this.skillsService.updateSkill(userId, skillId, updateData);
  }

  @Delete(':skillId')
  @UseGuards(JwtAuthGuard)
  async deleteSkill(@Req() request, @Param('skillId') skillId: number) {
    const userId = request.user.id;
    return await this.skillsService.deleteSkill(userId, skillId);
  }

  @Post(':skillId/departments/:departmentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.DEPARTMENT_MANAGER)
  async addSkillToDepartment(
    @Req() request,
    @Param('skillId') skillId: number,
    @Param('departmentId') departmentId: number,
  ) {
    const userId = request.user.id;
    return await this.skillsService.addSkillToDepartment(userId, skillId, departmentId);
  }
}
