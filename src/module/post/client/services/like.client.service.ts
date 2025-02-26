import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../../entities/like.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { PostClientFactory } from '../post.client.factory';

@Injectable()
export class LikeClientService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly Like_Repository: Repository<LikeEntity>,
    private readonly PostClientFactory: PostClientFactory,
  ) {}

  // private methods

  private async isPostLiked(postId: number, userId: number) {
    return await this.Like_Repository.exists({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
  }

  //public methods
  public async getLikesForPost(postId: number) {
    const [likes, count] = await this.Like_Repository.find({
      where: { id: postId },
      relations: ['user', 'post'],
      select: {
        id: true,
        createdAt: true,
        user: {
          id: true,
        },
        post: {
          id: true,
        },
      },
    });

    if (!likes)
      throw new NotFoundException('This post did not liked by any user');

    return {
      count,
      likes,
    };
  }

  public async LikeAndDislikePost(postId: number, user: UserEntity) {
    const post = await this.PostClientFactory.FindPostById(postId);

    if (!post) throw new NotFoundException('There is no post with this id');

    const isLiked = await this.isPostLiked(postId, user.id);

    if (isLiked) {
      await this.Like_Repository.delete({
        post: { id: postId },
        user: { id: user.id },
      });

      return {
        status: 'Post disliked',
      };
    } else {
      const newLike = await this.Like_Repository.create({ user, post });

      await this.Like_Repository.save(newLike);

      return {
        status: 'Post liked',
      };
    }
  }
}
