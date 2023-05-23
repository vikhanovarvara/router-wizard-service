import * as jwt from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

import { AES, enc } from 'crypto-js';

import { env } from 'common/utils/env';

const ACCESS_SECRET = env('ACCESS_TOKEN_SECRET');
const REFRESH_SECRET = env('REFRESH_TOKEN_SECRET');

const HASH_SEPARATOR = '___';

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

export function encodeSomeDataCode(
  someData: string,
  code: string,
  secretKey: string,
): string {
  return AES.encrypt(
    `SOME_DATA_CODE${HASH_SEPARATOR}${someData}${HASH_SEPARATOR}${code}`,
    secretKey,
  ).toString();
}

export function decodeSomeDataCode(
  hash: string,
  secretKey: string,
): { someData: string; code: string } | null {
  const bytes = AES.decrypt(hash, secretKey);

  const result = bytes.toString(enc.Utf8);

  if (!result) {
    return null;
  }

  const [_, someData, code] = result.split(HASH_SEPARATOR);

  return {
    someData,
    code,
  };
}

export function verifyCode(code: string, hash: string, secretKey: string) {
  const decodedHash = decodeSomeDataCode(hash, secretKey);
  return code === decodedHash?.code;
}
