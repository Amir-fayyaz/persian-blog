import { Module } from '@nestjs/common';
import { PostClientController } from './controllers/post.client.controller';
import { PostClientService } from './services/post.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAdminFactory } from 'src/module/users/admin/user.admin.factory';
import { UserAdminService } from 'src/module/users/admin/user.admin.service';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { LikeEntity } from '../entities/like.entity';
import { LikeClientController } from './controllers/like.client.controller';
import { LikeClientService } from './services/like.client.service';
import { PostClientFactory } from './post.client.factory';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, LikeEntity])],
  controllers: [PostClientController, LikeClientController],
  providers: [
    PostClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
    LikeClientService,
    PostClientFactory,
  ],
})
export class PostClientModule {}
