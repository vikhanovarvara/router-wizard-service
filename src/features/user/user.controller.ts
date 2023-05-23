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

import { UserService } from './user.service';
import { UserGetManyDto } from './dto/get-many.dto';
import { UserCreateDto } from './dto/create.dto';
import { UserUpdateDto } from './dto/update.dto';
import { AdminGuard } from 'common/guards/admin-guard';
import { exclude } from 'common/utils/field';
import { EmailService } from 'common/services/email.service';

@Controller('/users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  @Get()
  async getMany(@Query() params: UserGetManyDto) {
    const users = await this.userService.getMany(params);
    return users.map((user) => exclude(user, ['password']));
  }

  @Get('/:uuid')
  async getOne(@Param('uuid') uuid: string) {
    const user = await this.userService.getOne({ uuid });
    return exclude(user, ['password']);
  }

  @Post()
  async create(@Body() dto: UserCreateDto) {
    const user = await this.userService.create(dto);

    if (user) {
      await this.emailService.send({
        email: user.email,
        subject: 'Router Wizard Авторизация',
        text: `Ваш пароль для авторизации в сервисе: ${dto.password}`,
      });
    }

    return exclude(user, ['password']);
  }

  @Put('/:uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UserUpdateDto) {
    const user = await this.userService.update(uuid, dto);
    return exclude(user, ['password']);
  }

  @Delete('/:uuid')
  async delete(@Param('uuid') uuid: string) {
    const user = await this.userService.delete(uuid);
    return exclude(user, ['password']);
  }
}
