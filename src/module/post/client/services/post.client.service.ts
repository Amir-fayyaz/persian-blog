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

  public async findPostBySlug(slug: string) {
    const post = await this.Post_Repository.createQueryBuilder('post')
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
        'author.isSuperAdmin',
        'author.createdAt',
        'author.id',
        'likes.id',
        'likes.createdAt',
        'user.id',
      ])
      .getOne();

    if (!post) throw new NotFoundException('There is no post with this slug');

    return { post };
  }

  public async updatePostView(postId: number) {
    const result = await this.Post_Repository.createQueryBuilder()
      .update('post')
      .set({ views: () => 'views + 1' })
      .where('id = :postId', { postId })
      .execute();

    if (result.affected === 0)
      throw new NotFoundException('There is no post with this id');

    return { success: true };
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
