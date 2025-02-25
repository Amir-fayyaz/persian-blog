import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostClientService } from '../services/post.client.service';
import { PostSorting } from '../../enums/Post.sorting.enum';

@Controller('api/v1/client/posts')
export class PostClientController {
  constructor(private readonly PostClientService: PostClientService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.NEW))
    SortingBy: PostSorting,
  ) {
    return await this.PostClientService.getPosts(page, SortingBy);
  }
}
