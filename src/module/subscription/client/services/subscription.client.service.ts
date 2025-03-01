import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../../entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionClientService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly Subscription_Repository: Repository<SubscriptionEntity>,
  ) {}
}
