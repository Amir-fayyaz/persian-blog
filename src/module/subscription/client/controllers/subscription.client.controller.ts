import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { SubscriptionClientService } from '../services/subscription.client.service';

@ApiTags('client-subscription')
@UseGuards(UserGuard)
@Controller('api/v1/client/subscriptions')
export class SubscriptionClientController {
  constructor(
    private readonly SubscriptionService: SubscriptionClientService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'For get all subsctription' })
  @ApiQuery({ name: 'page', description: 'For pagination', type: Number })
  async getSubscriptions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubscriptionService.getSubscriptions(page);
  }
}
