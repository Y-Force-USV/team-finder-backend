import { Body, Controller, Post, Req } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AssignSkillsDto, CreateSkillDto } from './skills.dtos';
import { UsersService } from '../users/users.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async createSkill(@Body() data: CreateSkillDto) {
    return await this.skillsService.createSkill(data);
  }
}
