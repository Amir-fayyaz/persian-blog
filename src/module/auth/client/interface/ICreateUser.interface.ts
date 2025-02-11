import { CreateUserAdminDto } from 'src/module/users/admin/dto/createUser.admin.dto';
import { UserEntity } from 'src/module/users/entities/user.entity';

export interface ICreateUser {
  createUser(data: CreateUserAdminDto): Promise<UserEntity>;
}
