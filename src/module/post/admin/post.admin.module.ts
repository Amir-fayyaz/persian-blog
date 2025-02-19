import { Module } from '@nestjs/common';
import { PostAdminController } from './controllers/post.admin.controller';
import { PostAdminService } from './services/post.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { AuthAdminFactory } from 'src/module/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/module/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, AdminEntity])],
  controllers: [PostAdminController],
  providers: [PostAdminService, AuthAdminFactory, AuthAdminService, JwtService],
})
export class PostAdminModule {}
