import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubCategoryClientService } from '../services/subCategory.client.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('subCategory/client')
export class SubCategoryClientController {
  constructor(
    private readonly SubCategoryClientService: SubCategoryClientService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'get list of subCategories',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: 'page for pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories with pagination info.',
    schema: {
      type: 'object',
      properties: {
        totalPages: { type: 'number', description: 'Total number of pages' },
        subcategories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Subcategory ID' },
              name: { type: 'string', description: 'Subcategory name' },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Creation date',
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many request',
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryClientService.getAllSubCategories(page);
  }
}
