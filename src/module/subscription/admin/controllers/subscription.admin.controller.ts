import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SubscriptionAdminService } from '../services/subscription.admin.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Controller('api/v1/admin/subscriptions')
export class SubscriptionAdminController {
  constructor(private readonly SubscriptionService: SubscriptionAdminService) {}

  //GET -
  @Get()
  @ApiOperation({ summary: 'For get every subscription with pagination' })
  @ApiQuery({ name: 'page', type: Number, description: 'For pagination' })
  @HttpCode(HttpStatus.OK)
  async getSubscriptions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubscriptionService.getAllSubscriptions(page);
  }

  //POST -
  @Post()
  @ApiOperation({ summary: 'For create new subscription' })
  @ApiBody({ type: CreateSubscriptionDto, description: 'required fields' })
  @HttpCode(HttpStatus.CREATED)
  async createSubscription(@Body() data: CreateSubscriptionDto) {
    return await this.SubscriptionService.createSubscription(data);
  }
}
