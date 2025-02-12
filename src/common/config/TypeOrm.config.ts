import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { OtpEntity } from 'src/module/auth/entities/otp.entity';
import { CategoryEntity } from 'src/module/catogory/entities/category.entity';
import { UserEntity } from 'src/module/users/entities/user.entity';

config();

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST } = process.env;

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
  entities: [AdminEntity, UserEntity, OtpEntity, CategoryEntity],
  // synchronize: true,
};
