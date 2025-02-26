import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
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

<<<<<<< HEAD
  //export methods
  public async FindPostById(postId: number): Promise<PostEntity> {
    return await this.Post_Repository.findOne({
      where: {
        id: postId,
      },
    });
=======
  public async findPostById(postId: number): Promise<PostEntity> {
    return await this.Post_Repository.findOne({ where: { id: postId } });
  }

  public async findPostBySlug(slug: string) {
    const post = await this.Post_Repository.createQueryBuilder()
      .where('post.slug =:slug', { slug })
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('likes.user', 'user')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .select([
        'post',
        'author.username',
        'author.email',
        'author.avatar',
        'author.role',
        'author.isActive',
        'author.createdAt',
        'author.id',
        'likes.id',
        'likes.createdAt',
        'user.id',
      ])
      .getOne();

    if (!post) throw new NotFoundException('There is no post with this slug');

    return {
      post,
    };
>>>>>>> 490f1bc8f74ca77608be15cfd3d8078d0cbfebb1
  }
}

