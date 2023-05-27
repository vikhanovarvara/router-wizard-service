import {
  Body,
  Controller,
  NotFoundException,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import {
  decodeToken,
  encodeToAccessToken,
  encodeToRefreshToken,
} from 'common/services/jwt.service';
import { Cookies } from 'common/decorators/cookies.decorator';
import { CookieService } from 'common/services/cookie.service';
import { AppRequest } from 'common/types/app';
import { env } from 'common/utils/env';

import { UserService } from 'features/user/user.service';

import { SignInDto } from './dto/sign-in.dto';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { UserUpdateDto } from 'features/user/dto/update.dto';

const REFRESH_TOKEN_NAME = env('REFRESH_TOKEN_NAME');

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
  ) {}

  @Get('/current-user')
  async getCurrentUser(@CurrentUser('uuid') uuid: string) {
    return this.userService.getOne({ uuid });
  }

  @Put('/current-user')
  update(@CurrentUser('uuid') uuid: string, @Body() dto: UserUpdateDto) {
    return this.userService.update(uuid, dto);
  }

  @Delete('/current-user')
  delete(@CurrentUser('uuid') uuid: string) {
    return this.userService.delete(uuid);
  }

  @Post('/sign-in')
  async signIn(
    @Body() { email, password }: SignInDto,
    @Res() res: Response,
    @Req() req: AppRequest,
  ) {
    const user = await this.userService.getOne({ email });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль');

    const accessToken = encodeToAccessToken(user);
    const refreshToken = encodeToRefreshToken(user);

    this.cookieService.setAccessToken(res, accessToken);
    this.cookieService.setRefreshToken(res, refreshToken);

    req.user = user;
    req.token = accessToken;

    return res.json({ accessToken });
  }

  @Post('/refresh')
  async refresh(
    @Res() res: Response,
    @Cookies(REFRESH_TOKEN_NAME) token: string,
  ) {
    if (!token) {
      this.cookieService.clearAllTokens(res);
      throw new NotFoundException('Токен не найден');
    }

    const user = decodeToken(token) as User;

    const accessToken = encodeToAccessToken(user);
    const refreshToken = encodeToRefreshToken(user);

    this.cookieService.setAccessToken(res, accessToken);
    this.cookieService.setRefreshToken(res, refreshToken);

    return res.send({ message: 'Токен доступа обновлён' });
  }

  @Post('sign-out')
  signOut(@Res() res: Response) {
    this.cookieService.clearAllTokens(res);

    return res.send({ message: 'Пользователь вышел из системы' });
  }
}
