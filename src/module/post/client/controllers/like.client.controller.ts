import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LikeClientService } from '../services/like.client.service';

@Controller('api/v1/client/likes')
export class LikeClientController {
  constructor(private readonly LikeService: LikeClientService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getLikeForPost(@Param('id', ParseIntPipe) postId: number) {
    return await this.LikeService.getLikesForPost(postId);
  }
}
