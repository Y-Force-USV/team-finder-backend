import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/users/user.module';
import { OrganizationModule } from './modules/organizations/organization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
