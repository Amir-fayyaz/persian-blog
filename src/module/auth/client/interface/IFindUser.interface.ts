import { UserEntity } from 'src/module/users/entities/user.entity';

export interface IFindUserByMobile {
  getUserByPhoneNumber(mobile: string): Promise<UserEntity | null>;
}
