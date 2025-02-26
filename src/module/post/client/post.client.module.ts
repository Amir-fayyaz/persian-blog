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
import { CommentClientService } from './services/comment.client.service';
import { CommentClientController } from './controllers/comment.client.controller';
import { CommentEntity } from '../entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      UserEntity,
      LikeEntity,
      CommentEntity,
    ]),
  ],
  controllers: [
    PostClientController,
    LikeClientController,
    CommentClientController,
  ],
  providers: [
    PostClientService,
    JwtService,
    UserAdminFactory,
    UserAdminService,
    LikeClientService,
    PostClientFactory,
    CommentClientService,
  ],
})
export class PostClientModule {}
