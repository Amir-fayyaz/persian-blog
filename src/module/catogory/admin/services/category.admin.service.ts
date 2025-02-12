import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/category/createCategory.admin.dto';

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
}
