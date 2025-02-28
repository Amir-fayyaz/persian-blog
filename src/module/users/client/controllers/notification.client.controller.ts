import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { NotificationClientService } from '../services/notification.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from '../../entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@ApiTags('client-notifications')
@UseGuards(UserGuard)
@ApiBearerAuth()
@Controller('api/v1/client/notifications')
export class NotificationClientController {
  constructor(
    private readonly NotificationService: NotificationClientService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'For recive all user notifications',
  })
  @HttpCode(HttpStatus.OK)
  async getUserNotifications(@User() user: UserEntity) {
    return await this.NotificationService.getUserNotifications(user.id);
  }
}
