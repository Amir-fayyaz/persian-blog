import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { subCategoryEntity } from '../entities/subCategory.entity';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { SubCategoryAdminController } from './controllers/subCategory.admin.controller';
import { CategoryAdminService } from './services/category.admin.service';
import { SubCategoryAdminService } from './services/subCategory.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, subCategoryEntity])],
  controllers: [CategoryAdminController, SubCategoryAdminController],
  providers: [CategoryAdminService, SubCategoryAdminService],
})
export class CategoryAdminModule {}
