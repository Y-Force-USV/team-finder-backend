import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationsModule } from '../organizations/organizations.module';
import { Skill } from '../skills/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UserModule {}
