import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), DepartmentsModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, TypeOrmModule],
  exports: [TypeOrmModule.forFeature([Organization]), OrganizationsService],
})
export class OrganizationsModule {}
