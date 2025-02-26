import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { Repository } from 'typeorm';
import { PostClientFactory } from '../post.client.factory';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { CreateCommentDto } from '../dto/create-Comment.dto';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { CreateReplyDto } from '../dto/create-Reply.dto';

@Injectable()
export class CommentClientService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly Comment_Repository: Repository<CommentEntity>,
    private readonly PostClientFactory: PostClientFactory,
  ) {}

  //private methods

  //public methods
  public async createComment(
    data: CreateCommentDto,
    user: UserEntity,
    postId: number,
  ) {
    const post = await this.PostClientFactory.FindPostById(postId);

    if (!post) throw new NotFoundException('There is no post with this id');

    const newComment = this.Comment_Repository.create({
      ...data,
      user,
      post,
    });

    return await this.Comment_Repository.save(newComment);
  }

  public async deleteComment(commentId: number, userId: number) {
    const comment = await this.Comment_Repository.findOne({
      where: {
        id: commentId,
        user: { id: userId },
      },
    });

    if (!comment) {
      throw new NotFoundException('There is no comment with this id');
    }

    await this.Comment_Repository.remove(comment);

    return {
      success: true,
    };
  }

  public async getPostComments(page: number, postId: number) {
    const pagination = PaginationTool({ page, take: 20 });

    const post = await this.PostClientFactory.FindPostById(postId);

    if (!post) throw new NotFoundException('There is no post with this id');

    const [comments] = await this.Comment_Repository.findAndCount({
      where: {
        post: {
          id: postId,
        },
      },
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,

        user: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    return {
      totalCount: comments.length,
      comments,
    };
  }

  public async createReply(
    data: CreateReplyDto,
    commentId: number,
    user: UserEntity,
  ) {
    const comment = await this.Comment_Repository.findOne({
      where: { id: commentId },
    });

    if (!comment)
      throw new NotFoundException('There is no comment with this id');

    const newReply = await this.Comment_Repository.create({
      ...data,
      user,
      parent: comment,
    });

    return await this.Comment_Repository.save(newReply);
  }
}
