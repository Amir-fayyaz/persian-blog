import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { subCategoryEntity } from '../entities/subCategory.entity';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { SubCategoryAdminController } from './controllers/subCategory.admin.controller';
import { CategoryAdminService } from './services/category.admin.service';
import { SubCategoryAdminService } from './services/subCategory.admin.service';
import { AuthAdminFactory } from 'src/module/auth/admin/auth.admin.factory';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminService } from 'src/module/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, subCategoryEntity, AdminEntity]),
  ],
  controllers: [CategoryAdminController, SubCategoryAdminController],
  providers: [
    CategoryAdminService,
    SubCategoryAdminService,
    AuthAdminFactory,
    AuthAdminService,
    JwtService,
  ],
})
export class CategoryAdminModule {}
