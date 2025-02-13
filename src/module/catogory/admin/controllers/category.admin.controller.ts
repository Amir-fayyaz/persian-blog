import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CategoryAdminService } from '../services/category.admin.service';
import { CreateCategoryDto } from '../dto/category/createCategory.admin.dto';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryEntity } from '../../entities/category.entity';

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
  async getCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.CategoryAdminService.getAllCategories(page);
  }
}
