import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [TypeOrmModule.forFeature([Skill]), SkillsService],
})
export class SkillsModule {}
