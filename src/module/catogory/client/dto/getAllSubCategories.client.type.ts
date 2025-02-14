import { subCategoryEntity } from '../../entities/subCategory.entity';

export type getAllSubCategoriesResponse = {
  totalPages: number;

  subCategories: subCategoryEntity[];
};
