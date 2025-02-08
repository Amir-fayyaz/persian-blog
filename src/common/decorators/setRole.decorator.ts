import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Role = (roles: ('admin' | 'user' | 'superAdmin')[]) => {
  SetMetadata(ROLE_KEY, roles);
};
