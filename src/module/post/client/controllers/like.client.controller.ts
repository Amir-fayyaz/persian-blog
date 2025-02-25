import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LikeClientService } from '../services/like.client.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/v1/client/likes')
export class LikeClientController {
  constructor(private readonly LikeService: LikeClientService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'for get all likes of special post',
  })
  @ApiParam({
    name: 'id',
    description: 'PostId of you want to recive that likes',
  })
  @HttpCode(HttpStatus.OK)
  async getLikeForPost(@Param('id', ParseIntPipe) postId: number) {
    return await this.LikeService.getLikesForPost(postId);
  }
}
