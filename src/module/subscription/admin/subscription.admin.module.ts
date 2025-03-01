import { Module } from '@nestjs/common';
import { SubscriptionAdminController } from './controllers/subscription.admin.controller';
import { SubscriptionAdminService } from './services/subscription.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { AuthAdminFactory } from 'src/module/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/module/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity, AdminEntity])],
  controllers: [SubscriptionAdminController],
  providers: [
    SubscriptionAdminService,
    AuthAdminFactory,
    AuthAdminService,
    JwtService,
  ],
})
export class SubscriptionAdminModule {}
