import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/common/config/TypeOrm.config';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../catogory/category.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 20, limit: 4 }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
