import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAdminService } from './user.admin.service';
import { UserAdminController } from './user.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserAdminController],
  providers: [UserAdminService],
})
export class UserAdminModule {}
