import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostAdminService } from '../services/post.admin.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PostEntity } from '../../entities/post.entity';
import { PostSorting } from '../../enums/Post.sorting.enum';
import { Admin } from 'src/common/decorators/getAdmin.decorator';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';
import { CreatePostDto } from '../dto/create-post.dto';

@UseGuards(AdminGuard)
@Controller('api/v1/admin/posts')
export class PostAdminController {
  constructor(private readonly PostAdminService: PostAdminService) {}

  // GET -
  @Get(':id')
  @ApiOperation({
    summary: 'find post by id',
    description: 'get post with special id if it exist',
  })
  @ApiParam({
    name: 'id ',
    description: 'id of post you want to recive',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'recive special post',
    type: PostEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There is no post with this id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @HttpCode(HttpStatus.OK)
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.PostAdminService.findPostById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'recive all posts with pagination',
  })
  @ApiParam({
    name: 'page',
    description: 'page for pagination',
    type: Number,
    example: 1,
  })
  @ApiParam({
    name: 'sortingBy',
    required: false,
    description: 'you can decide to recive new posts or popular posts',
    enum: PostSorting,
    example: PostSorting.POPULAR,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'you recive posts succcessfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @HttpCode(HttpStatus.OK)
  async getAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.NEW))
    sortingBy: PostSorting,
  ) {
    return await this.PostAdminService.getPosts(page, sortingBy);
  }

  //DELETE -
  @Delete(':id')
  @ApiOperation({
    summary: 'delete post by id',
  })
  @ApiParam({
    name: 'id',
    description: 'id of post you want to delete',
  })
  @HttpCode(HttpStatus.OK)
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Admin() admin: AdminEntity,
  ) {
    return await this.PostAdminService.deletePost(id, +admin.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Admin() admin: AdminEntity,
  ) {
    return await this.PostAdminService.createNewPost(createPostDto, admin);
  }

  @Get('/author/:id')
  @HttpCode(HttpStatus.OK)
  async getPostByAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.PostAdminService.getPostsForAuthor(id);
  }
}
