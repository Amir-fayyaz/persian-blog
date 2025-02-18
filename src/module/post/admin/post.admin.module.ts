import { Module } from '@nestjs/common';
import { PostAdminController } from './controllers/post.admin.controller';
import { PostAdminService } from './services/post.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostAdminController],
  providers: [PostAdminService],
})
export class PostAdminModule {}
