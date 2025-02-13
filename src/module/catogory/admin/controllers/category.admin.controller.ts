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
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CategoryAdminService } from '../services/category.admin.service';
import { CreateCategoryDto } from '../dto/category/createCategory.admin.dto';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CategoryEntity } from '../../entities/category.entity';
import { UpdateCategoryDto } from '../dto/category/updateCategory.admin.dto';

@Controller('category/admin')
export class CategoryAdminController {
  constructor(private readonly CategoryAdminService: CategoryAdminService) {}

  //POST -
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'add new category',
    description: 'enter title & recive new category info',
  })
  @ApiBody({
    description: 'credentials for create new category',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'There is another category with this title',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async CreateNewCategory(@Body() data: CreateCategoryDto) {
    return await this.CategoryAdminService.CreateCategory(data);
  }

  //GET -
  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of categories',
    description:
      'Fetch a list of categories with pagination support. You can specify the page number with the "page" query parameter.',
  })
  @ApiQuery({
    name: 'page',
    description: 'the page number for pagination , default is 1',
    type: Number,
    example: 1,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched categories list',
    schema: {
      type: 'object',
      properties: {
        totalPages: {
          type: 'number',
          description:
            'The total number of pages available based on the pagination.',
        },
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Category ID' },
              title: { type: 'string', description: 'Category Title' },
              createdAt: {
                type: 'string',
                description: 'Creation timestamp of the category',
                format: 'date-time',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token is missing or invalid.',
  })
  @HttpCode(HttpStatus.OK)
  async getCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.CategoryAdminService.getAllCategories(page);
  }

  //PUT -
  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category to update',
    type: Number,
  })
  @ApiBody({
    description: 'The new data for the category to be updated',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully & return id',
    schema: {
      example: {
        id: 1,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found for the given ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token is missing or invalid.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return await this.CategoryAdminService.UpdateCategory(id, data);
  }
}
