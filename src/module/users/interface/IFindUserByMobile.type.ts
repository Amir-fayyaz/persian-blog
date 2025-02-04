import { UserEntity } from '../entities/user.entity';

export interface IGetUserByPhoneNumber {
  getUserByPhoneNumber(mobile: string): Promise<UserEntity | null>;
}
