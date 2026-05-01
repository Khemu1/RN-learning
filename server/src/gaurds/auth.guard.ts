import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModifiedRequest } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ModifiedRequest>();
    if (req.session?.userId) {
      req.userId = req.session.userId;
      return true;
    }
    return false;
  }
}
