import { Module } from '@nestjs/common';
import { AuthClientController } from './auth.client.controller';
import { AuthClientService } from './auth.client.service';
import { AuthClientFactory } from './auth.client.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { UserAdminService } from 'src/module/users/admin/user.admin.service';
import { UserEntity } from 'src/module/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity, UserEntity])],
  controllers: [AuthClientController],
  providers: [AuthClientService, AuthClientFactory, UserAdminService],
})
export class AuthClientModule {}
