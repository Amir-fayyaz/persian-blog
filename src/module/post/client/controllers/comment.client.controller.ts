import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentClientService } from '../services/comment.client.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
