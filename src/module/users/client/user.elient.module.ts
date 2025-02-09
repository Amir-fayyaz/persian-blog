import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserClientService } from './user.client.service';
import { UserClientController } from './user.client.controller';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from '../admin/user.admin.factory';
import { UserAdminService } from '../admin/user.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserClientController],
  providers: [
    UserClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
  ],
})
export class UserClientModule {}
