import { Injectable, NotFoundException } from '@nestjs/common';

import { promises as fs } from 'fs';
import * as mime from 'mime-types';

@Injectable()
export class ImageAdminService {
  constructor() {}

  public async uploadImage(file: Express.Multer.File) {
    return file;
  }

  public async readFile(path: string) {
    const Buffer = await fs.readFile(path);

    if (!Buffer) {
      throw new NotFoundException('There is no file with this path');
    }

    const mimeType = mime.lookup(path) || 'application/octet-stream';

    return { Buffer, mimeType };
  }
}
