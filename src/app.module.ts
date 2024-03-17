import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SkillsModule } from './modules/skills/skills.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsCategoryModule } from './modules/skill-category/skills-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    OrganizationsModule,
    SkillsModule,
    SkillsCategoryModule,
    AuthModule,
    DepartmentsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
