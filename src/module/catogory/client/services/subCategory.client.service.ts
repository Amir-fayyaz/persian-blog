import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { getAllSubCategoriesResponse } from '../dto/getAllSubCategories.client.type';
import { time } from 'console';

@Injectable()
export class SubCategoryClientService {
  constructor(
    @InjectRepository(subCategoryEntity)
    private readonly SubCategory_Repository: Repository<subCategoryEntity>,
  ) {}

  public async getAllSubCategories(
    page: number,
  ): Promise<getAllSubCategoriesResponse> {
    const pagiation = PaginationTool({ page, take: 20 });

    const [subCategories, totalCount] =
      await this.SubCategory_Repository.findAndCount({
        order: { createdAt: 'DESC' },
        take: pagiation.take,
        skip: pagiation.skip,

        select: {
          id: true,
          title: true,
          createdAt: true,
          category: {
            id: true,
            title: true,
          },
        },
      });

    return {
      totalPages: Math.ceil(totalCount / pagiation.take),
      subCategories,
    };
  }
}
