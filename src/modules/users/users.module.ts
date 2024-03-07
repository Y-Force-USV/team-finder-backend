import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationsModule } from '../organizations/organizations.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationsModule, SkillsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UserModule {}
