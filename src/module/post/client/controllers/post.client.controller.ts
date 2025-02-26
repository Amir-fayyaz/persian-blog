import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostClientService } from '../services/post.client.service';
import { PostSorting } from '../../enums/Post.sorting.enum';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@ApiTags('client-post')
@UseGuards(UserGuard)
@Controller('api/v1/client/posts')
export class PostClientController {
  constructor(private readonly PostClientService: PostClientService) {}

  //GET -
  @Get()
  @ApiOperation({
    summary: 'for recive posts with pagination',
  })
  @ApiQuery({
    name: 'page',
    default: 1,
    description: 'required field for pagination',
    required: false,
  })
  @ApiQuery({
    name: 'sortingBy',
    description: 'its for sorting by newest posts or popular posts',
    enum: PostSorting,
    required: false,
    default: PostSorting.NEW,
  })
  @HttpCode(HttpStatus.OK)
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.NEW))
    SortingBy: PostSorting,
  ) {
    return await this.PostClientService.getPosts(page, SortingBy);
  }

  //GET
  @Get(':slug')
  @ApiOperation({ summary: 'Find post by slug' })
  @ApiParam({ name: 'slug', type: String, description: 'slug of post' })
  @HttpCode(HttpStatus.OK)
  async getPostBySlug(@Param('slug') slug: string) {
    return await this.PostClientService.findPostBySlug(slug);
  }
}
