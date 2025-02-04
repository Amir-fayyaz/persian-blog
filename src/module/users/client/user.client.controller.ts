import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserClientService } from './user.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../entities/user.entity';
import { EditUserClientDto } from './dto/editUser.client.dto';

@Controller('users')
export class UserClientController {
  constructor(private readonly UserClientService: UserClientService) {}

  @Get('profile')
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: number,
    @User() user: UserEntity,
    @Body() data: EditUserClientDto,
  ) {
    return await this.UserClientService.editProfile(id, user, data);
  }

  @Delete('profile')
  async deleteAcount(@User() user: UserEntity) {
    return await this.UserClientService.deleteAcount(user);
  }
}
