import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModifiedRequest } from 'src/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<ModifiedRequest>();
    const userExists = await this.userService.findUserById(req.userId);
    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }
    return true;
  }
}
