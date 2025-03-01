import { Module } from '@nestjs/common';
import { SubscriptionAdminController } from './controllers/subscription.admin.controller';
import { SubscriptionAdminService } from './services/subscription.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  controllers: [SubscriptionAdminController],
  providers: [SubscriptionAdminService],
})
export class SubscriptionAdminModule {}
