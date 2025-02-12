import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { subCategoryEntity } from '../entities/subCategory.entity';
import { CategoryClientController } from './controllers/category.client.controller';
import { SubCategoryClientController } from './controllers/subCategory.client.controller';
import { CategoryClientService } from './services/category.client.service';
import { SubCategoryClientService } from './services/subCategory.client.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, subCategoryEntity])],
  controllers: [CategoryClientController, SubCategoryClientController],
  providers: [CategoryClientService, SubCategoryClientService],
})
export class CategoryClientModule {}
