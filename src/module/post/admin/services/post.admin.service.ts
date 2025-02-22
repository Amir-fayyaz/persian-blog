import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { PostSorting } from '../../enums/Post.sorting.enum';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';

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

  public async deletePost(postId: number, AdminId: number) {
    //? Does Post exists ?
    const post = await this.Post_Repository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException('There is no post with this id');

    //? this admin is owner of this post ?
    if (post && post.author.id !== AdminId)
      throw new ForbiddenException(
        'Access denied , this post is not related to you',
      );

    // method for delete PostImages

    await this.Post_Repository.remove(post);

    return post;
  }
}
