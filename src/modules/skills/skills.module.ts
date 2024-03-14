import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { DepartmentsModule } from '../departments/departments.module';
import { UsersModule } from '../users/users.module';
import { SkillCategory } from '../skill-category/skill-category.entity';
import { SkillsCategoryModule } from '../skill-category/skills-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => SkillsCategoryModule),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [TypeOrmModule.forFeature([Skill, SkillCategory]), SkillsService],
})
export class SkillsModule {}
