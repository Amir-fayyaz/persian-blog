import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'dotenv';
import { AuthAdminFactory } from './auth.admin.factory';

config();

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE,
      },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, AuthAdminFactory],
})
export class AuthAdminModule {}
