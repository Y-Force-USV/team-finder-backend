import { Module, forwardRef } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { ProjectsController } from './projects.controller';

Module({
  imports: [TypeOrmModule.forFeature([Project]), forwardRef(() => UsersService)],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
});
export class ProjectsModule {}
