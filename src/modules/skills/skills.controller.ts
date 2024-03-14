import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AssignSkillsDto, CreateSkillDto } from './skills.dtos';
import { CreateSkillCategoryDto } from '../skill-category/skill-category.dtos';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.DEPARTMENT_MANAGER)
  async createSkill(@Body() data: CreateSkillDto) {
    return await this.skillsService.createSkill(data);
  }

  @Post('/category')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.DEPARTMENT_MANAGER)
  createSkillCategory(@Body() data: CreateSkillCategoryDto) {
    return this.skillsService.createSkillCategory(data);
  }

  @Post('assign-skills')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignSkills(@Req() request, @Body() data: AssignSkillsDto) {
    const userId = request.user.id;
    return await this.skillsService.assignSkills(userId, data.skills);
  }
}
