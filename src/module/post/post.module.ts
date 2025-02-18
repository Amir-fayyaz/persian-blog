import { Module } from '@nestjs/common';
import { PostAdminModule } from './admin/post.admin.module';

@Module({
  imports: [PostAdminModule],
  controllers: [],
  providers: [],
})
export class PostModule {}
