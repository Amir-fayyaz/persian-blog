import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageAdminService } from './image.admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOption } from 'src/common/config/multer.config';
import { UploadFileType } from '../enums/uploadType.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth()
@Controller('api/v1/admin/image')
export class ImageAdminController {
  constructor(private readonly ImageService: ImageAdminService) {}

  //POST -
  @Post()
  @ApiOperation({
    summary: 'for upload profile/post image',
    description: 'send a valid image file & return file info',
  })
  @ApiQuery({
    name: 'uploadType',
    description: 'is this image for post or profile',
    enum: UploadFileType,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'file uploaded succcessfully & recive file info',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error , Invalid uploadType or file',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', MulterOption))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.ImageService.uploadImage(file);
  }

  // GET -
  @Get()
  @ApiOperation({
    summary: 'for reciving files',
  })
  @ApiQuery({
    name: 'fullPath',
    type: String,
    description: 'fullPath of image you want to recive',
  })
  @HttpCode(HttpStatus.OK)
  async readFile(
    @Query('fullPath') fullPath: string,
    @Res() response: Response,
  ) {
    const file = await this.ImageService.readFile(fullPath);

    response.setHeader('Content-Type', file.mimeType).send(file.Buffer);
  }
}
