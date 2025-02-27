import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReportEntity } from '../../entities/postReport.entity';
import { Repository } from 'typeorm';
import { PostClientFactory } from '../post.client.factory';
import { UserEntity } from 'src/module/users/entities/user.entity';

@Injectable()
export class PostReportClientService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly postReport_Repository: Repository<PostReportEntity>,
    private readonly PostFactory: PostClientFactory,
  ) {}

  //private methods

  // public methods
  public async createPostReport(postId: number, user: UserEntity) {
    const post = await this.PostFactory.FindPostById(postId);

    if (!post) throw new NotFoundException('There is no post to report');

    const isReported = await this.postReport_Repository.findOne({
      where: {
        post: { id: postId },
        user: { id: user.id },
      },
    });

    if (isReported) {
      throw new ConflictException('You reported this post');
    }

    const newReport = this.postReport_Repository.create({ post, user });

    return await this.postReport_Repository.save(newReport);
  }

  public async deletePostReport(postId: number, user: UserEntity) {
    const Report = await this.postReport_Repository.findOne({
      where: {
        post: {
          id: postId,
        },
        user: {
          id: user.id,
        },
      },
    });

    if (!Report)
      throw new NotFoundException('There is no report for this post');

    await this.postReport_Repository.remove(Report);

    return { success: true };
  }
}
