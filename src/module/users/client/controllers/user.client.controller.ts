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
import { User } from 'src/common/decorators/getUser.decorator';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';
import { UserClientService } from '../services/user.client.service';
import { EditUserClientDto } from '../dto/editUser.client.dto';

@ApiTags('client-users')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('api/v1/client/users')
export class UserClientController {
  constructor(private readonly UserClientService: UserClientService) {}

  //GET -
  @Get('Me')
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
  @Put('Me/:id')
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
  @Delete('Me')
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
