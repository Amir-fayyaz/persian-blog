import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostAdminService } from '../services/post.admin.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PostEntity } from '../../entities/post.entity';

@Controller('api/v1/admin/posts')
export class PostAdminController {
  constructor(private readonly PostAdminService: PostAdminService) {}

  // GET -
  @Get(':id')
  @ApiOperation({
    summary: 'find post by id',
    description: 'get post with special id if it exist',
  })
  @ApiParam({
    name: 'id ',
    description: 'id of post you want to recive',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'recive special post',
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There is no post with this id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @HttpCode(HttpStatus.OK)
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.PostAdminService.findPostById(id);
  }
}
