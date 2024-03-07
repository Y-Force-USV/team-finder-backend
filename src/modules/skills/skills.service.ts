import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './skills.dtos';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private usersRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async createSkill(data: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(data);
    await this.skillRepository.save(skill);
    return skill;
  }


}
