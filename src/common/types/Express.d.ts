import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { UserEntity } from 'src/module/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
      admin?: AdminEntity;
    }
  }
}
