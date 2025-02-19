import { Module } from '@nestjs/common';
import { ImageAdminModule } from './admin/image.admin.module';

@Module({
  imports: [ImageAdminModule],
  controllers: [],
  providers: [],
})
export class ImageModule {}
