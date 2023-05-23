import { Injectable } from '@nestjs/common';
import { env } from 'common/utils/env';
import { CookieOptions, Request, Response } from 'express';

const NODE_ENV = env('NODE_ENV');
const ACCESS_TOKEN_NAME = env('ACCESS_TOKEN_NAME');
const REFRESH_TOKEN_NAME = env('REFRESH_TOKEN_NAME');
const EMAIL_CODE_NAME = env('EMAIL_CODE_NAME');

@Injectable()
export class CookieService {
  NEW_DATE = new Date();

  private HOUR = 3_600_000;
  private MAX_AGE_15_MIN = this.HOUR / 4;
  private MAX_AGE_1_DAY = this.HOUR * 24;
  private MAX_AGE_30_DAYS = this.MAX_AGE_1_DAY * 30;

  private sameSite: CookieOptions['sameSite'] =
    NODE_ENV === 'production' ? 'lax' : 'none';

  private get defaultOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      maxAge: this.MAX_AGE_15_MIN,
      sameSite: this.sameSite,
    };
  }

  private get emailCodeOptions(): CookieOptions {
    return this.defaultOptions;
  }

  private get accessTokenOptions(): CookieOptions {
    return this.defaultOptions;
  }

  private get refreshTokenOptions(): CookieOptions {
    return {
      ...this.defaultOptions,
      maxAge: this.MAX_AGE_30_DAYS,
    };
  }

  setEmailCode(res: Response, code: string) {
    res.cookie(EMAIL_CODE_NAME, code, this.emailCodeOptions);

    console.log('set email code: ', res.cookie[EMAIL_CODE_NAME]);
  }

  setAccessToken(res: Response, token: string) {
    res.cookie(ACCESS_TOKEN_NAME, token, this.accessTokenOptions);
  }

  setRefreshToken(res: Response, token: string) {
    res.cookie(REFRESH_TOKEN_NAME, token, this.refreshTokenOptions);
  }

  clearEmailCode(res: Response) {
    res.clearCookie(EMAIL_CODE_NAME, this.emailCodeOptions);
  }

  clearAllTokens(res: Response) {
    res.clearCookie(ACCESS_TOKEN_NAME, this.accessTokenOptions);
    res.clearCookie(REFRESH_TOKEN_NAME, this.refreshTokenOptions);
  }
}

export function getRequestToken(req: Request): string | undefined {
  const header = req.header('Authorization');

  if (header) {
    return header.replace('Bearer ', '');
  }

  return req.cookies[ACCESS_TOKEN_NAME];
}
