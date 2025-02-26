import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentClientService } from '../services/comment.client.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { CreateCommentDto } from '../dto/create-Comment.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/module/users/entities/user.entity';

@ApiTags('client-comment')
@UseGuards(UserGuard)
@Controller('api/v1/client/comment')
export class CommentClientController {
  constructor(private readonly CommentService: CommentClientService) {}

  @Post(':id')
  @ApiOperation({
    summary: 'for add a newComment',
  })
  @ApiParam({
    name: 'id',
    description: 'post-id',
    type: Number,
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'required fields for create new comment',
  })
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Param('id', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserEntity,
  ) {
    return await this.CommentService.createComment(
      createCommentDto,
      user,
      postId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'api for delete a comment',
  })
  @ApiParam({ name: 'id', description: 'comment-id' })
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @User() user: UserEntity,
  ) {
    return await this.CommentService.deleteComment(commentId, +user.id);
  }
}
