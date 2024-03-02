import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrganizationModule } from '../organizations/organization.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
