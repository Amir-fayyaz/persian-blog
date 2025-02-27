import { UserEntity } from '../entities/user.entity';

export interface IFindUserById {
  getUserById(id: number): Promise<UserEntity>;
}
