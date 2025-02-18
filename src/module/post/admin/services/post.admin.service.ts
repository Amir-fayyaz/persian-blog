import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly Post_Repository: Repository<PostEntity>,
  ) {}

  //private method

  //public method

  public async findPostById(id: number) {
    const post = await this.Post_Repository.findOne({
      where: {
        id,
      },
      relations: ['author', 'subcategory', 'subcategory.category'],
    });

    if (!post) throw new NotFoundException('There is no post with this id');

    return post;
  }
}
