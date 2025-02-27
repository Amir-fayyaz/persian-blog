import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAdminController } from './controllers/user.admin.controller';
import { UserAdminService } from './services/user.admin.service';
import { UserAdminFactory } from './user.admin.factory';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminFactory } from 'src/module/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/module/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AdminEntity])],
  controllers: [UserAdminController],
  providers: [
    UserAdminService,
    UserAdminFactory,
    JwtService,
    AuthAdminFactory,
    AuthAdminService,
  ],
})
export class UserAdminModule {}
