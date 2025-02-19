import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';

export const MulterOption: MulterOptions = {
  storage: diskStorage({
    destination: 'static/uploads',

    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      const uniqueName: number = Date.now() + -Math.round(Math.random() * 1e9);
      const ext: string = file.originalname.split('.').pop();

      cb(null, `${uniqueName}.${ext}`);
    },
  }),

  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    const allowedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('File type not allowed'), false);
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 1, // 1MB
  },
};
