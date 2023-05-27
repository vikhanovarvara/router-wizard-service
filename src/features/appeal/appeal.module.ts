import { Module } from '@nestjs/common';

import { PrismaService } from 'common/services/prisma.service';

import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { EmailService } from 'common/services/email.service';

@Module({
  controllers: [AppealController],
  providers: [AppealService, PrismaService, EmailService],
  exports: [AppealService],
})
export class AppealModule {}
