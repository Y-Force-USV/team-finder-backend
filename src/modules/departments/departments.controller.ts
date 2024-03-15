import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateDepartmentDto, UpdateDepartmentByAdminDto } from './departments.dtos';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  async createDepartment(@Req() req, @Body() data: CreateDepartmentDto) {
    return await this.departmentsService.createDepartmentByAdmin(data, req.user.id);
  }

  @Get('/:id')
  async getDepartmentById(@Param('id') id: number) {
    return await this.departmentsService.findDepartmentById(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  async updateDepartment(@Body() data: UpdateDepartmentByAdminDto) {
    return await this.departmentsService.updateDepartment(data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  async deleteDepartment(@Param('id') id: number, @Req() req) {
    return await this.departmentsService.deleteDepartament(req.user.id, id);
  }

  @Post('/:id/assign-manager/:managerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  async assignDepartmentManager(
    @Param('id') departmentId: number,
    @Param('managerId') managerUserId: number,
    organizationId: number,
  ) {
    return await this.departmentsService.assignDepartmentManager(
      departmentId,
      managerUserId,
      organizationId,
    );
  }

  @Post('/:id/add-memeber/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN, UserRole.DEPARTMENT_MANAGER)
  async addMemberToDepartment(@Param('id') departmentId: number, @Param('userId') userId: number) {
    return await this.departmentsService.addMemberToDepartmetnt(departmentId, userId);
  }

  @Delete('/id/remove-member/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN, UserRole.DEPARTMENT_MANAGER)
  async removeMemberFromDepartment(
    @Param('id') departmentId: number,
    @Param('userId') userId: number,
  ) {
    return await this.departmentsService.removeMemberFromDepartment(departmentId, userId);
  }
}
