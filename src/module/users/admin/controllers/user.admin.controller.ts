import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserAdminService } from '../services/user.admin.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';

@ApiBearerAuth()
@ApiTags('admin-user')
@UseGuards(AdminGuard)
@Controller('api/v1/admin/user')
export class UserAdminController {
  constructor(private readonly UserAdminService: UserAdminService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'recive all users',
    type: UserEntity,
  })
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.UserAdminService.getAllUsers(page);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'userId of user ' })
  @ApiResponse({ status: 200, description: 'User found ', type: UserEntity })
  @ApiResponse({ status: 404, description: 'user not found' })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.UserAdminService.getUserById(+id);
  }
}
