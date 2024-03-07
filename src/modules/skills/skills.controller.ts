import { Body, Controller, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './skills.dtos';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async createSkill(@Body() data: CreateSkillDto) {
    return await this.skillsService.createSkill(data);
  }
}
