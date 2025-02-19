import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Admin = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().admin;
  },
);
