import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SubCategoryAdminService } from '../services/subCategory.admin.service';
import { CreateSubCategoryDto } from '../dto/subCategory/createSubCategory.admin.dto';

@Controller('subcategory/admin')
export class SubCategoryAdminController {
  constructor(
    private readonly SubCategoryAdminService: SubCategoryAdminService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(@Body() data: CreateSubCategoryDto) {
    return await this.SubCategoryAdminService.CreateSubCategory(data);
  }
}
