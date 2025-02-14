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

@Controller('subCategory/client')
export class SubCategoryClientController {
  constructor(
    private readonly SubCategoryClientService: SubCategoryClientService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSubCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.SubCategoryClientService.getAllSubCategories(page);
  }
}
