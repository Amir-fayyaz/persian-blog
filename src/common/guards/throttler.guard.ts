import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class RateLimit extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return req.ip;
  }
  protected async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();

    const key = this.getTracker(req);
    const weight = '1';
    const blockDuration = ttl;

    console.log(key);

    const { totalHits } = await this.storageService.increment(key, ttl);

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - totalHits));
    res.setHeader(
      'X-RateLimit-Reset',
      new Date(Date.now() + ttl).toISOString(),
    );

    if (totalHits > limit) {
      throw new ThrottlerException();
    }

    return true;
  }
}
