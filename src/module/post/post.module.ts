import { Module } from '@nestjs/common';
import { PostAdminModule } from './admin/post.admin.module';
import { PostClientModule } from './client/post.client.module';

@Module({
  imports: [PostAdminModule, PostClientModule],
  controllers: [],
  providers: [],
})
export class PostModule {}
