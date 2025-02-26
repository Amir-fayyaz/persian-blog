import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { PostSorting } from '../../enums/Post.sorting.enum';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@UseGuards(UserGuard)
@Injectable()
export class PostClientService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly Post_Repository: Repository<PostEntity>,
  ) {}

  // private services

  // public services
  public async getPosts(page: number, Sorting: PostSorting) {
    const pagination = PaginationTool({ page, take: 20 });

    const queryBuilder = this.Post_Repository.createQueryBuilder('post');

    if (Sorting === PostSorting.NEW)
      queryBuilder.orderBy('post.createdAt', 'DESC');
    if (Sorting === PostSorting.POPULAR)
      queryBuilder.orderBy('post.views', 'DESC');

    const [posts, totalCount] = await queryBuilder
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();

    return {
      totalPages: Math.ceil(totalCount / pagination.take),
      posts,
    };
  }

  //export methods
  public async FindPostById(postId: number): Promise<PostEntity> {
    return await this.Post_Repository.findOne({
      where: {
        id: postId,
      },
    });
  }
}
