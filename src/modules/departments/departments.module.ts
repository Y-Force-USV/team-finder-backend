import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentsService } from './departments.service';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
    forwardRef(() => UsersModule),
    forwardRef(() => OrganizationsModule),
  ],
  controllers: [],
  providers: [DepartmentsService],
  exports: [TypeOrmModule.forFeature([Department]), DepartmentsService],
})
export class DepartmentsModule {}
