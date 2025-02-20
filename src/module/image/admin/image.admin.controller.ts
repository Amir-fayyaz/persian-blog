import {
  Controller,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageAdminService } from './image.admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOption } from 'src/common/config/multer.config';
import { UploadFileType } from '../enums/uploadType.enum';

@Controller('api/v1/admin/image')
export class ImageAdminController {
  constructor(private readonly ImageService: ImageAdminService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', MulterOption))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.ImageService.uploadImage(file);
  }
}
