import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/common/config/TypeOrm.config';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../catogory/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
