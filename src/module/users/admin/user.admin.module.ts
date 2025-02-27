import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAdminController } from './controllers/user.admin.controller';
import { UserAdminService } from './services/user.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserAdminController],
  providers: [UserAdminService],
})
export class UserAdminModule {}
