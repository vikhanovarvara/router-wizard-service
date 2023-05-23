import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { env, getRequiredEnvsByNodeEnv } from './common/utils/env';
import { NodeEnv } from 'common/types/app';

const PORT = env('PORT');

const envs: string[] = [
  'NODE_ENV',
  'HOST',
  'PORT',
  'DATABASE_URL',
  'SHADOW_DATABASE_URL',
  'EMAIL_AUTH_USER',
  'EMAIL_AUTH_PASSWORD',
  'EMAIL_SERVICE_PORT',
  'EMAIL_SERVICE_HOST',
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
  'EMAIL_CODE_SECRET',
  'ACCESS_TOKEN_NAME',
  'REFRESH_TOKEN_NAME',
  'EMAIL_CODE_NAME',
];

const requiredEnvs = getRequiredEnvsByNodeEnv(
  { common: envs },
  env('NODE_ENV') as NodeEnv,
);

requiredEnvs.forEach((envKey) => {
  if (!env(envKey)) {
    throw new Error(`Add ${envKey} to .env file!`);
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log('NIEPCE SERVICE LISTEN: ' + PORT);
  });
}

bootstrap();
