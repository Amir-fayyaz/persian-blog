import { Module } from '@nestjs/common';
import { PostAdminController } from './controllers/post.admin.controller';
import { PostAdminService } from './services/post.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { AuthAdminFactory } from 'src/module/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/module/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { PostAdminFactory } from './post.admin.factory';
import { SubCategoryAdminService } from 'src/module/catogory/admin/services/subCategory.admin.service';
import { subCategoryEntity } from 'src/module/catogory/entities/subCategory.entity';
import { CategoryAdminService } from 'src/module/catogory/admin/services/category.admin.service';
import { CategoryEntity } from 'src/module/catogory/entities/category.entity';
import { ImageAdminService } from 'src/module/image/admin/image.admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      AdminEntity,
      subCategoryEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [PostAdminController],
  providers: [
    PostAdminService,
    PostAdminFactory,
    AuthAdminFactory,
    AuthAdminService,
    SubCategoryAdminService,
    CategoryAdminService,
    JwtService,
    ImageAdminService,
  ],
})
export class PostAdminModule {}
