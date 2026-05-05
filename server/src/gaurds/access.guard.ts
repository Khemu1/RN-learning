import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModifiedRequest } from '@/types';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ModifiedRequest>();
    const userExists = await this.userService.findUserById(req.user.id);
    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }
    return true;
  }
}
