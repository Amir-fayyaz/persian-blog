import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserClientService } from './user.client.service';
import { UserClientController } from './user.client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserClientController],
  providers: [UserClientService],
})
export class UserClientModule {}
