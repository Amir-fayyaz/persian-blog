import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserAdminService } from './user.admin.service';
import { CreateUserAdminDto } from './dto/createUser.admin.dto';
import { UpdateUserAdminDto } from './dto/updateUser.admin.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

@ApiBearerAuth()
@ApiTags('userAdmin')
@Controller('users/Admin')
export class UserAdminController {
  constructor(private readonly UserAdminService: UserAdminService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'recive all users',
    type: UserEntity,
  })
  async getUsers() {
    return await this.UserAdminService.getAllUsers();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'userId of user ' })
  @ApiResponse({ status: 200, description: 'User found ', type: UserEntity })
  @ApiResponse({ status: 404, description: 'user not found' })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.UserAdminService.getUserById(+id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'user created successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'There is acount with this phone-number before',
  })
  async createUser(@Body() data: CreateUserAdminDto) {
    return await this.UserAdminService.createUser(data);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'userId of user ' })
  @ApiResponse({
    status: 200,
    description: 'info updated successfully & return id & data',
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 400,
    description: 'There is another acount with this phone-number',
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserAdminDto,
  ) {
    return await this.UserAdminService.updateUser(+id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'userId of user ' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully & return id',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.UserAdminService.deleteUser(+id);
  }
}
