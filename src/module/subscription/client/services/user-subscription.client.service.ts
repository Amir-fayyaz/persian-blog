import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSubscriptionEntity } from '../../entities/user-subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSubscriptionClientService {
  constructor(
    @InjectRepository(UserSubscriptionEntity)
    private readonly UserSubscription_Repository: Repository<UserSubscriptionEntity>,
  ) {}

  //private servies

  //public services
  public async getUserSubscriptionsByUserId(userId: number) {
    const userSubscriptions = await this.UserSubscription_Repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: { createdAt: 'DESC' },
      relations: ['plan'],
      select: {
        plan: {
          name: true,
          durationDays: true,
        },
      },
    });

    if (userSubscriptions.length < 1)
      throw new NotFoundException('There is no Subscriptions for this user');

    return {
      count: userSubscriptions.length,
      userSubscriptions,
    };
  }
}
