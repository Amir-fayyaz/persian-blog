import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/common/config/TypeOrm.config';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
