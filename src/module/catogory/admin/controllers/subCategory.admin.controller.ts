import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/subCategory/createSubCategory.admin.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateSubCategoryDto } from '../dto/subCategory/updateSubCategory.admin.dto';

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
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories for the specified category',
    schema: {
      example: [
        { id: 1, title: 'Subcategory 1', categoryId: 'category1' },
        { id: 2, title: 'Subcategory 2', categoryId: 'category1' },
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

  //DELETE -
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcategory by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The  id of the subcategory to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategory successfully deleted',
    schema: {
      example: { id: 1 },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found for the given ID',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not found' },
      },
    },
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
  async deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.SubCategoryAdminService.DeleteSubCategory(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSubCategoryDto,
  ) {
    return await this.SubCategoryAdminService.UpdateSubCategory(id, data);
  }
}
