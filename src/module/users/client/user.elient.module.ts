import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from '../admin/user.admin.factory';
import { UserAdminService } from '../admin/services/user.admin.service';
import { UserClientService } from './services/user.client.service';
import { UserClientController } from './controllers/user.client.controller';
import { NotificationClientController } from './controllers/notification.client.controller';
import { NotificationClientService } from './services/notification.client.service';
import { NotificationEntity } from '../entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, NotificationEntity])],
  controllers: [UserClientController, NotificationClientController],
  providers: [
    UserClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
    NotificationClientService,
  ],
})
export class UserClientModule {}
