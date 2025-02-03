import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';

config();

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST } = process.env;

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
};
