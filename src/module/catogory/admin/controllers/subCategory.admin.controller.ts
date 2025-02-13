import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/subCategory/createSubCategory.admin.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('subcategory/admin')
export class SubCategoryAdminController {
  constructor(
    private readonly SubCategoryAdminService: SubCategoryAdminService,
  ) {}

  //POST -
  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiBody({
    description: 'The data required to create a new subcategory',
    type: CreateSubCategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Subcategory created successfully',
    schema: {
      example: {
        id: 'sub-category-id',
        title: 'Subcategory Title',
        category: 'category-id',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists for a subcategory',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the given id',
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
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryAdminService.CreateSubCategory(data);
  }

  //GET -
  @Get(':categoryId')
  @ApiOperation({ summary: 'Get all subcategories for a specific category' })
  @ApiParam({
    name: 'categoryId',
    description: 'category id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories for the specified category',
    schema: {
      example: [
        { id: 'subcat1', title: 'Subcategory 1', categoryId: 'category1' },
        { id: 'subcat2', title: 'Subcategory 2', categoryId: 'category1' },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found for the given categoryId',
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
  async getSubCategoriesByCategoryId(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.SubCategoryAdminService.getSubCategoriesByCategoryId(
      categoryId,
    );
  }
}
