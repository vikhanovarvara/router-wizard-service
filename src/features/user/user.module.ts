import { Module } from '@nestjs/common';

import { PrismaService } from 'common/services/prisma.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from 'common/services/email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService],
  exports: [UserService],
})
export class UserModule {}
