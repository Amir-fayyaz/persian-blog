import { Module } from '@nestjs/common';
import { UserAdminModule } from './admin/user.admin.module';
import { UserClientModule } from './client/user.elient.module';

@Module({
  imports: [UserAdminModule, UserClientModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
