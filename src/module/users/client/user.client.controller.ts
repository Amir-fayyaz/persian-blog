import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserClientService } from './user.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../entities/user.entity';
import { EditUserClientDto } from './dto/editUser.client.dto';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users/client')
export class UserClientController {
  constructor(private readonly UserClientService: UserClientService) {}

  //GET -
  @Get('profile')
  @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'get client profile',
    description: 'client can get all info if have an jwt-token',
  })
  @ApiResponse({
    status: 200,
    description: 'get profile successfully',
    schema: {
      example: {
        user: UserEntity,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this info',
  })
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  //PUT -
  @Put('profile/:id')
  @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'edit profile of client',
  })
  @ApiBody({
    description: 'details for update client-info',
    type: EditUserClientDto,
  })
  @ApiParam({
    name: 'id',
    description: 'id of client',
  })
  @ApiResponse({
    status: 200,
    description: 'profile edited successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        mobile: { type: 'string' },
        role: { type: 'string', example: 'admin' },
        avatar: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this id',
  })
  @ApiResponse({
    status: 400,
    description:
      'This profile is not related to user | There is another acount with this new phone-number',
  })
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('id') id: number,
    @User() user: UserEntity,
    @Body() data: EditUserClientDto,
  ) {
    return await this.UserClientService.editProfile(id, user, data); //! Complete
  }

  //DELETE -
  @Delete('profile')
  @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'Delete-Acount for client',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this id',
  })
  @ApiResponse({
    status: 200,
    description: 'Acount deleted successfully',
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  async deleteAcount(@User() user: UserEntity) {
    return await this.UserClientService.deleteAcount(user);
  }
}
