import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@prisma/client';

import { AppRequest } from 'common/types/app';
import { getRequestToken } from 'common/services/cookie.service';
import { decodeToken } from 'common/services/jwt.service';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AppRequest = ctx.switchToHttp().getRequest();

    const token = getRequestToken(request);

    const decodedUser = decodeToken(token) as User;

    if (!decodedUser) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    if (decodedUser.role !== 'ADMIN') {
      throw new UnauthorizedException(
        'Доступно только для пользователя с ролью админ',
      );
    }

    return true;
  }
}
