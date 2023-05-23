import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { getRequestToken } from 'common/services/cookie.service';
import { decodeToken } from 'common/services/jwt.service';
import { AppRequest } from 'common/types/app';

export const CurrentUser = createParamDecorator(
  async (data: keyof User, ctx: ExecutionContext) => {
    const request: AppRequest = ctx.switchToHttp().getRequest();

    const token = getRequestToken(request);

    const decodedUser = decodeToken(token) as User;

    if (!decodedUser) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    return data ? decodedUser[data] : decodedUser;
  },
);
