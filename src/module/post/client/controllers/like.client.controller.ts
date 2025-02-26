import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeClientService } from '../services/like.client.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@UseGuards(UserGuard)
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

  @Post(':id')
  @ApiOperation({
    summary: 'For likeOrDisLike one post',
  })
  @ApiParam({
    name: 'id',
    description: 'PostId',
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  async LikeOrDisLikePost(
    @Param('id', ParseIntPipe) postId: number,
    @User() user: UserEntity,
  ) {
    return await this.LikeService.LikeAndDislikePost(postId, user);
  }
}
