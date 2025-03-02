import { Module } from '@nestjs/common';
import { SubscriptionClientController } from './controllers/subscription.client.controller';
import { SubscriptionClientService } from './services/subscription.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from 'src/module/users/admin/user.admin.factory';
import { UserAdminService } from 'src/module/users/admin/services/user.admin.service';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { UserSubscriptionClientController } from './controllers/user-subscription.client.controller';
import { UserSubscriptionClientService } from './services/user-subscription.client.service';
import { UserSubscriptionEntity } from '../entities/user-subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscriptionEntity,
      UserEntity,
      UserSubscriptionEntity,
    ]),
  ],
  controllers: [SubscriptionClientController, UserSubscriptionClientController],
  providers: [
    SubscriptionClientService,
    UserSubscriptionClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
  ],
})
export class SubscriptionClientModule {}
