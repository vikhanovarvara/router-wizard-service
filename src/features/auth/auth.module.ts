import { Module } from '@nestjs/common';

import { CookieService } from 'common/services/cookie.service';
import { FileService } from 'common/services/file.service';
import { PrismaService } from 'common/services/prisma.service';

import { UserModule } from 'features/user/user.module';
import { UserService } from 'features/user/user.service';
import { EmailService } from 'common/services/email.service';

import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    UserService,
    CookieService,
    EmailService,
    PrismaService,
    FileService,
  ],
})
export class AuthModule {}
