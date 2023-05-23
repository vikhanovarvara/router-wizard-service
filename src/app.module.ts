import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { env } from 'common/utils/env';

import { ErrorsInterceptor } from 'common/interceptors/errors.interceptor';
import { TimeoutInterceptor } from 'common/interceptors/timeout.interceptor';

import { AuthModule } from 'features/auth/auth.module';
import { AppealModule } from 'features/appeal/appeal.module';
import { UserModule } from 'features/user/user.module';

const EMAIL_SERVICE_HOST = env('EMAIL_SERVICE_HOST');
const EMAIL_SERVICE_PORT = +env('EMAIL_SERVICE_PORT');

const EMAIL_AUTH_USER = env('EMAIL_AUTH_USER');
const EMAIL_AUTH_PASSWORD = env('EMAIL_AUTH_PASSWORD');

const EnvModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

const EmailModule = MailerModule.forRoot({
  transport: {
    host: EMAIL_SERVICE_HOST,
    port: EMAIL_SERVICE_PORT,
    auth: {
      user: EMAIL_AUTH_USER,
      pass: EMAIL_AUTH_PASSWORD,
    },
    secure: false,
  },
});

@Module({
  imports: [EnvModule, EmailModule, AuthModule, AppealModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
