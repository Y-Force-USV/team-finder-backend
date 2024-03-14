import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from '../departments/departments.module';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { SkillCategory } from '../skill-category/skill-category.entity';
import { SkillsCategoryService } from './skills-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkillCategory]), forwardRef(() => OrganizationsModule)],
  controllers: [],
  providers: [SkillsCategoryService],
  exports: [TypeOrmModule.forFeature([SkillCategory]), SkillsCategoryService],
})
export class SkillsCategoryModule {}
