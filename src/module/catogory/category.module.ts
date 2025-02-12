import { Module } from '@nestjs/common';
import { CategoryAdminModule } from './admin/category.admin.module';
import { CategoryClientModule } from './client/category.client.module';

@Module({
  imports: [CategoryAdminModule, CategoryClientModule],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
