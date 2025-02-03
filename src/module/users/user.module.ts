import { Module } from '@nestjs/common';
import { UserAdminModule } from './admin/user.admin.module';

@Module({
  imports: [UserAdminModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
