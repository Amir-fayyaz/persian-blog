import { subCategoryEntity } from 'src/module/catogory/entities/subCategory.entity';

export interface IFindSubCategoryById {
  findSubCategoryById(id: number): Promise<subCategoryEntity>;
}
