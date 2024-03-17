import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { InvitationController } from './invitation.controller';
import { InvitationsService } from './invitation.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), forwardRef(() => OrganizationsModule)],
  controllers: [InvitationController],
  providers: [InvitationsService],
  exports: [TypeOrmModule.forFeature([Invitation]), InvitationsService],
})
export class InvitationModule {}
