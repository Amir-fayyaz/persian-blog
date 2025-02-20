import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageAdminService {
  constructor() {}

  public async uploadImage(file: Express.Multer.File) {
    return file;
  }
}
