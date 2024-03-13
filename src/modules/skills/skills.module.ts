import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { DepartmentsModule } from '../departments/departments.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), DepartmentsModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [TypeOrmModule.forFeature([Skill]), SkillsService],
})
export class SkillsModule {}
