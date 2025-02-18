import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostAdminService } from '../services/post.admin.service';

@Controller('api/v1/admin/posts')
export class PostAdminController {
  constructor(private readonly PostAdminService: PostAdminService) {}

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.PostAdminService.findPostById(id);
  }
}
