import { Injectable } from '@nestjs/common';
import { IFindSubCategoryById } from '../interface/IFindSubCategory';
import { SubCategoryAdminService } from 'src/module/catogory/admin/services/subCategory.admin.service';

@Injectable()
export class PostAdminFactory {
  private findSubCategoryById: IFindSubCategoryById;
  constructor(SubCategoryService: SubCategoryAdminService) {
    this.findSubCategoryById = SubCategoryService;
  }

  public async findSubCategory(id: number) {
    return await this.findSubCategoryById.findSubCategoryById(id);
  }
}
