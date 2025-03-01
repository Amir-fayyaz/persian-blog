import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../../entities/subscription.entity';
import { Repository } from 'typeorm';
import { PaginationTool } from 'src/common/utils/pagination.util';

@Injectable()
export class SubscriptionAdminService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly Subscription_Repository: Repository<SubscriptionEntity>,
  ) {}

  //private methods

  //public methods
  public async getAllSubscriptions(page: number) {
    const pagination = PaginationTool({ page, take: 20 });

    const subscriptions = await this.Subscription_Repository.find({
      order: { durationDays: 'ASC' },
      take: pagination.take,
      skip: pagination.skip,
    });

    return {
      page,
      subscriptions,
      count: subscriptions.length,
    };
  }
}
