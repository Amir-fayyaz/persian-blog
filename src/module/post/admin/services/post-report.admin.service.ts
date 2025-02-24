import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReportEntity } from '../../entities/postReport.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostReportService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly Post_Repository: Repository<PostReportEntity>,
  ) {}

  //private methods

  //public methods
  public async findAllReports() {
    const [reports, totalCount] = await this.Post_Repository.find({
      order: { createdAt: 'DESC' },
      relations: ['user', 'post', 'post.subcategory'],
      select: {
        user: {
          id: true,
          name: true,
          mobile: true,
        },
        post: {
          id: true,
          description: true,
          title: true,
          slug: true,
          createdAt: true,
          subcategory: { id: true, title: true },
        },
      },
    });

    return {
      reports,
      totalCount,
    };
  }
}
