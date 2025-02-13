import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subCategoryEntity } from '../../entities/subCategory.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from '../dto/subCategory/createSubCategory.admin.dto';
import { CategoryAdminService } from './category.admin.service';
import { IFindCategoryById } from '../../interfaces/findCategory.interface';
import { UpdateSubCategoryDto } from '../dto/subCategory/updateSubCategory.admin.dto';

@Injectable()
export class SubCategoryAdminService {
  private readonly findCategory: IFindCategoryById;
  constructor(
    @InjectRepository(subCategoryEntity)
    private readonly SubCatergory_Repository: Repository<subCategoryEntity>,
    private readonly categoryAdminService: CategoryAdminService,
  ) {
    this.findCategory = this.categoryAdminService;
  }

  // private method
  private async CheckTitle(title: string) {
    const isExistCategory = await this.SubCatergory_Repository.exists({
      where: {
        title,
      },
    });

    if (isExistCategory) {
      throw new ConflictException('There is subCategory title already exist');
    }
  }

  private async FindCategory(category_id: number) {
    const category = await this.findCategory.findCategoryById(category_id);

    if (!category)
      throw new NotFoundException('There is no category with this id');

    return category;
  }

  //public methods
  public async CreateSubCategory(
    data: CreateSubCategoryDto,
  ): Promise<subCategoryEntity> {
    await this.CheckTitle(data.title);

    const category = await this.FindCategory(data.category_id);

    const newSubCategory = this.SubCatergory_Repository.create({
      title: data.title,
      category: category,
    });

    return await this.SubCatergory_Repository.save(newSubCategory);
  }

  public async getSubCategoriesByCategoryId(
    id: number,
  ): Promise<subCategoryEntity[]> {
    const subCategories = await this.SubCatergory_Repository.find({
      where: {
        category: {
          id,
        },
      },
      order: {
        category: { createdAt: 'DESC' },
      },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
    });

    if (!subCategories.length) {
      throw new NotFoundException('No subCategories for this categoryId');
    }

    return subCategories;
  }

  public async DeleteSubCategory(id: number): Promise<number> {
    const deletedResult = await this.SubCatergory_Repository.delete({ id });

    if (!deletedResult.affected)
      throw new NotFoundException('There is no subCategory with this id');

    return id;
  }

  public async UpdateSubCategory(
    id: number,
    data: UpdateSubCategoryDto,
  ): Promise<number> {
    await this.CheckTitle(data.title);

    const updateResult = await this.SubCatergory_Repository.update(
      { id },
      data,
    );

    if (!updateResult.affected) {
      throw new NotFoundException('not found any subcategory with this Id');
    }

    return id;
  }
}
