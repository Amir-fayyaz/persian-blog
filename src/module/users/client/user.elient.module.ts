import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from '../admin/user.admin.factory';
import { UserAdminService } from '../admin/services/user.admin.service';
import { UserClientService } from './services/user.client.service';
import { UserClientController } from './controllers/user.client.controller';

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
