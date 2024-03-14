import { Module, forwardRef } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

Module({
  imports: [TypeOrmModule.forFeature([Project]), forwardRef(() => UsersService)],
  controllers: [],
  providers: [ProjectsService],
  exports: [TypeOrmModule.forFeature([Project]), ProjectsService],
});
export class ProjectsModule {}
