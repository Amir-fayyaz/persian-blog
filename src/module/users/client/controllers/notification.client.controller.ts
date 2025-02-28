import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NotificationClientService } from '../services/notification.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../../entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@ApiTags('client-notifications')
@UseGuards(UserGuard)
@ApiBearerAuth()
@Controller('api/v1/client/notifications')
export class NotificationClientController {
  constructor(
    private readonly NotificationService: NotificationClientService,
  ) {}

  //GET -
  @Get()
  @ApiOperation({
    summary: 'For recive all user notifications',
  })
  @HttpCode(HttpStatus.OK)
  async getUserNotifications(@User() user: UserEntity) {
    return await this.NotificationService.getUserNotifications(user.id);
  }

  //GET -
  @Get(':id')
  @ApiOperation({ summary: 'For recive sepcial notification by id' })
  @ApiParam({ name: 'id', description: 'notification-id' })
  @HttpCode(HttpStatus.OK)
  async getNotificationById(@Param('id', ParseIntPipe) id: number) {
    return await this.NotificationService.getNotificationById(id);
  }
}
