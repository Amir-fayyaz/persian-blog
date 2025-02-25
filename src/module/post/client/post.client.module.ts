import { Module } from '@nestjs/common';
import { PostClientController } from './controllers/post.client.controller';
import { PostClientService } from './services/post.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from 'src/module/users/admin/user.admin.factory';
import { UserAdminService } from 'src/module/users/admin/user.admin.service';
import { UserEntity } from 'src/module/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostClientController],
  providers: [
    PostClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
  ],
})
export class PostClientModule {}
