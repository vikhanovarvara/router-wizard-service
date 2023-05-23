import { Module } from '@nestjs/common';

import { PrismaService } from 'common/services/prisma.service';

import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';

@Module({
  controllers: [AppealController],
  providers: [AppealService, PrismaService],
  exports: [AppealService],
})
export class AppealModule {}
