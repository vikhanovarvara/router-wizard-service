import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'common/services/prisma.service';

import { AppealGetOneDto } from './dto/get-one.dto';
import { AppealCreateDto } from './dto/create.dto';
import { AppealUpdateDto } from './dto/update.dto';
import { AppealGetManyDto } from './dto/get-many.dto';

@Injectable()
export class AppealService {
  constructor(private prisma: PrismaService) {}

  async getMany({ skip, take, match }: AppealGetManyDto) {
    return this.prisma.appeal.findMany({
      skip,
      take,
      where: {
        name: {
          contains: match,
        },
      },
    });
  }

  async getOne({ uuid }: AppealGetOneDto) {
    return this.prisma.appeal.findUnique({
      where: { uuid },
    });
  }

  async create({
    name,
    email,
    phone,
    router,
    address,
    status,
    description,
  }: AppealCreateDto) {
    return this.prisma.appeal.create({
      data: {
        name,
        email,
        phone,
        router,
        address,
        status,
        description,
      },
    });
  }

  async update(
    uuid: string,
    {
      name,
      email,
      phone,
      router,
      address,
      status,
      description,
    }: AppealUpdateDto,
  ) {
    const appeal = await this.getOne({ uuid });

    if (!appeal) {
      throw new NotFoundException('Заявка не найдена');
    }

    return this.prisma.appeal.update({
      where: { uuid },
      data: {
        name,
        email,
        phone,
        router,
        address,
        status,
        description,
      },
    });
  }

  async delete(uuid: string) {
    const appeal = await this.getOne({ uuid });

    if (!appeal) {
      throw new NotFoundException('Заявка не найдена');
    }

    return this.prisma.appeal.delete({ where: { uuid } });
  }
}
