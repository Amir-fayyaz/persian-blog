import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { Repository } from 'typeorm';
import { PostClientFactory } from '../post.client.factory';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { CreateCommentDto } from '../dto/create-Comment.dto';

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

    if (!this.deleteComment) {
      throw new NotFoundException('There is no comment with this id');
    }

    await this.Comment_Repository.remove(comment);

    return {
      success: true,
    };
  }
}
