import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationAdminService } from '../services/notification.admin.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';

@UseGuards(AdminGuard)
@ApiTags('admin-notification')
@Controller('api/v1/admin/notifications')
export class NotificationAdminController {
  constructor(private readonly NotificationService: NotificationAdminService) {}

  @Post(':id')
  @ApiOperation({
    summary: 'For create Notification for special user',
  })
  @ApiBody({
    type: CreateNotificationDto,
    description: 'required fields for create Notification',
  })
  @ApiParam({
    name: 'id',
    description: 'user-id you want to create new Notification for',
  })
  @HttpCode(HttpStatus.CREATED)
  async createNotification(
    @Body() data: CreateNotificationDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return await this.NotificationService.createNotification(data, userId);
  }
}
