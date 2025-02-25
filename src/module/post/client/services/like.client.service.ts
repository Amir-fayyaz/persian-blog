import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../../entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeClientService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly Like_Repository: Repository<LikeEntity>,
  ) {}

  // private methods

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
}
