import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../../entities/subscription.entity';
import { Repository } from 'typeorm';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

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

  public async createSubscription(data: CreateSubscriptionDto) {
    const newSubscription = await this.Subscription_Repository.create(data);

    return await this.Subscription_Repository.save(newSubscription);
  }

  public async deleteSubscriptionById(subscriptionId: number) {
    const subscription = await this.Subscription_Repository.findOne({
      where: {
        id: subscriptionId,
      },
    });

    if (!subscription)
      throw new NotFoundException('There is no subscription with this id');

    await this.Subscription_Repository.remove(subscription);

    return {
      success: true,
    };
  }
}
