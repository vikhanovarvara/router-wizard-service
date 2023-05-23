import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AppealService } from './appeal.service';
import { AppealGetManyDto } from './dto/get-many.dto';
import { AppealCreateDto } from './dto/create.dto';
import { AppealUpdateDto } from './dto/update.dto';
import { AdminGuard } from 'common/guards/admin-guard';

@Controller('/appeals')
export class AppealController {
  constructor(private appealService: AppealService) {}

  @Get()
  getMany(@Query() params: AppealGetManyDto) {
    return this.appealService.getMany(params);
  }

  @Get('/:uuid')
  getOne(@Param('uuid') uuid: string) {
    return this.appealService.getOne({ uuid });
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: AppealCreateDto) {
    return this.appealService.create(dto);
  }

  @Put('/:uuid')
  update(@Param('uuid') uuid: string, @Body() dto: AppealUpdateDto) {
    return this.appealService.update(uuid, dto);
  }

  @UseGuards(AdminGuard)
  @Delete('/:uuid')
  delete(@Param('uuid') uuid: string) {
    return this.appealService.delete(uuid);
  }
}
