import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryAdminService } from '../services/category.admin.service';
import { CreateCategoryDto } from '../dto/category/createCategory.admin.dto';
import { AdminGuard } from 'src/module/auth/guards/admin.guard';

@Controller('category/admin')
export class CategoryAdminController {
  constructor(private readonly CategoryAdminService: CategoryAdminService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AdminGuard)
  async CreateNewCategory(@Body() data: CreateCategoryDto) {
    return await this.CategoryAdminService.CreateCategory(data);
  }
}
