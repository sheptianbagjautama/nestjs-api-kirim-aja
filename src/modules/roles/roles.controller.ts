import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/logged-in.guard';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { RoleResponse } from '../auth/response/auth-login.response';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(): Promise<BaseResponse<RoleResponse[]>> {
    return {
      message:"Roles fetched successfully",
      data: await this.rolesService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<BaseResponse<RoleResponse>> {
    return {
      message:`Role with id ${id} fetched successfully`,
      data:await this.rolesService.findOne(+id)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto):Promise<BaseResponse<RoleResponse>> {
    return {
      message:`Role with id ${id} updated successfully`,
      data: await this.rolesService.update(+id, updateRoleDto)
    }
  }
}
