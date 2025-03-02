import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserSubscriptionClientService } from '../services/user-subscription.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('client-userSubscription')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('api/v1/client/user-subscriptions')
export class UserSubscriptionClientController {
  constructor(
    private readonly UserSubscriptionService: UserSubscriptionClientService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserSubscriptions(@User() user: UserEntity) {
    return await this.UserSubscriptionService.getUserSubscriptionsByUserId(
      +user.id,
    );
  }
}
