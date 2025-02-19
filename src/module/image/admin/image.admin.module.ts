import { Module } from '@nestjs/common';
import { ImageAdminController } from './image.admin.controller';
import { ImageAdminService } from './image.admin.service';

@Module({
  imports: [],
  controllers: [ImageAdminController],
  providers: [ImageAdminService],
})
export class ImageAdminModule {}
