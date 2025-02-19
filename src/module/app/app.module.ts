import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/common/config/TypeOrm.config';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../catogory/category.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PostModule } from '../post/post.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 20, limit: 4 }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    AuthModule,
    CategoryModule,
    PostModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
