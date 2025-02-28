import { Module } from '@nestjs/common';
import { SubscriptionAdminModule } from './admin/subscription.admin.module';
import { SubscriptionClientModule } from './client/subscription.client.module';

@Module({
  imports: [SubscriptionAdminModule, SubscriptionClientModule],
  controllers: [],
  providers: [],
})
export class SubscriptionModule {}
