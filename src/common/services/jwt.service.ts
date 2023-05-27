import * as jwt from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

import { env } from 'common/utils/env';

const ACCESS_SECRET = env('ACCESS_TOKEN_SECRET');
const REFRESH_SECRET = env('REFRESH_TOKEN_SECRET');

export function encodeToAccessToken(obj: object) {
  const plainObj = instanceToPlain(obj);

  return jwt.sign(plainObj, ACCESS_SECRET);
}

export function encodeToRefreshToken(obj: object) {
  const plainObj = instanceToPlain(obj);

  return jwt.sign(plainObj, REFRESH_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export function verifyToken(token: string, secretKey: string): boolean {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (e) {
    return false;
  }
}
