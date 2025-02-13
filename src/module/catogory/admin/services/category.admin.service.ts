import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/category/createCategory.admin.dto';
import { PaginationTool } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly Category_Repository: Repository<CategoryEntity>,
  ) {}

  // private services
  private async CheckTitle(title: string) {
    const category = await this.Category_Repository.exists({
      where: {
        title,
      },
    });

    if (category) throw new ConflictException('This category already exist');
  }

  // public services
  public async CreateCategory(
    data: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    //Check is category exist before or not
    await this.CheckTitle(data.title);

    const newCategory = this.Category_Repository.create(data);

    return await this.Category_Repository.save(newCategory);
  }

  public async getAllCategories(page: number) {
    const pagination = PaginationTool({ page, take: 20 });

    const [categories, totalCount] =
      await this.Category_Repository.findAndCount({
        take: pagination.take,
        skip: pagination.skip,
        order: {
          createdAt: 'DESC',
        },
      });

    return {
      pages: Math.ceil(totalCount / pagination.take),
      categories,
    };
  }
}
