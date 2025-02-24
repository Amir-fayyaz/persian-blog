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
import { CreatePostDto } from '../dto/create-post.dto';
import { PostAdminFactory } from '../post.admin.factory';
import { ImageDetailsDto } from '../dto/image.dto';
import { ImageAdminService } from 'src/module/image/admin/image.admin.service';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly Post_Repository: Repository<PostEntity>,
    private readonly PostAdminFactory: PostAdminFactory,
    private readonly ImageService: ImageAdminService,
  ) {}

  private readonly Dir = 'static/uploads/post/';

  //private method
  private async generateSlug(title: string): Promise<string> {
    const slug =
      title.replaceAll(' ', '-') + '-' + Math.random().toString(16).slice(3, 9);

    const isValidSlug = await this.Post_Repository.findOne({
      where: {
        slug,
      },
    });

    if (isValidSlug) {
      return await this.generateSlug(title);
    }

    return slug;
  }

  //!
  private async deletePostImages(thumbnail?: string, gallery?: string[]) {
    if (thumbnail) {
      await this.ImageService.deleteFile(this.Dir + thumbnail);
      return true;
    } else {
      for (const imagePath of gallery) {
        await this.ImageService.deleteFile(this.Dir + imagePath);
      }
      return true;
    }
  }

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
      relations: ['author'],
    });

    if (!post) throw new NotFoundException('There is no post with this id');

    //? this admin is owner of this post ?
    if (post && Number(post.author.id) !== AdminId)
      throw new ForbiddenException(
        'Access denied , this post is not related to you',
      );

    // method for delete PostImages
    await this.deletePostImages(post.thumbnail, post.gallery);

    await this.Post_Repository.remove(post);

    return post;
  }

  public async createNewPost(data: CreatePostDto, author: AdminEntity) {
    const subcategory = await this.PostAdminFactory.findSubCategory(
      data.subcategory,
    );
    if (!subcategory)
      throw new NotFoundException('not found any subcategory with this Id');

    const slug = await this.generateSlug(data.title);
    let galleries: string[];

    if (data.gallery) {
      galleries = data.gallery.map((data) => {
        return data.fullPath;
      });
    } else {
      galleries = [];
    }

    const newPost = this.Post_Repository.create({
      title: data.title,
      tags: data.tags,
      thumbnail: data.thumbnail[0],
      description: data.description,
      gallery: galleries,
      subcategory: subcategory,
      slug: slug,
      author: author,
    });

    return await this.Post_Repository.save(newPost);
  }

  public async getPostsForAuthor(authorId: number) {
    const posts = await this.Post_Repository.find({
      where: {
        author: { id: authorId },
      },
      order: { createdAt: 'DESC' },
      relations: ['author', 'subcategory', 'subcategory.category'],
    });

    if (posts.length < 1)
      throw new NotFoundException('No post related to this author');

    return posts;
  }
}
