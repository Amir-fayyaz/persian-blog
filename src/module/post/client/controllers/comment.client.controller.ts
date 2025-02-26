import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentClientService } from '../services/comment.client.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { CreateCommentDto } from '../dto/create-Comment.dto';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { CreateReplyDto } from '../dto/create-Reply.dto';

@ApiTags('client-comment')
@UseGuards(UserGuard)
@Controller('api/v1/client/comment')
export class CommentClientController {
  constructor(private readonly CommentService: CommentClientService) {}

  //POST -
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

  //DELETE -
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

  //GET -
  @Get(':id')
  @ApiOperation({
    summary: 'For fetch all comments of special post',
  })
  @ApiParam({ name: 'id', description: 'post-id', type: Number })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'page For pagination',
    default: 1,
  })
  @HttpCode(HttpStatus.OK)
  async getPostComments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return await this.CommentService.getPostComments(page, postId);
  }

  //POST -
  @Post('reply/:id')
  @ApiOperation({
    summary: 'For create reply to comment',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'required fields for create new reply',
  })
  @ApiParam({
    name: 'id',
    description: 'comment-id',
    type: Number,
  })
  @HttpCode(HttpStatus.CREATED)
  async createReply(
    @Body() createReplyDto: CreateReplyDto,
    @Param('id', ParseIntPipe) commentId: number,
    @User() user: UserEntity,
  ) {
    return await this.CommentService.createReply(
      createReplyDto,
      commentId,
      user,
    );
  }
}
