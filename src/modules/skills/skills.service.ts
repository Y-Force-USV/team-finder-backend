import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './skills.dtos';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async createSkill(data: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(data);
    await this.skillRepository.save(skill);
    return skill;
  }
}
