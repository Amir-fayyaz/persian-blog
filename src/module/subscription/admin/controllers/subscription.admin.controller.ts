import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubscriptionAdminService } from '../services/subscription.admin.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/v1/admin/subscriptions')
export class SubscriptionAdminController {
  constructor(private readonly SubscriptionService: SubscriptionAdminService) {}

  @Get()
  @ApiOperation({ summary: 'For get every subscription with pagination' })
  @ApiQuery({ name: 'page', type: Number, description: 'For pagination' })
  @HttpCode(HttpStatus.OK)
  async getSubscriptions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubscriptionService.getAllSubscriptions(page);
  }
}
