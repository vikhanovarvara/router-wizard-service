import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from 'common/services/prisma.service';

import { UserGetOneDto } from './dto/get-one.dto';
import { UserCreateDto } from './dto/create.dto';
import { UserUpdateDto } from './dto/update.dto';
import { UserGetManyDto } from './dto/get-many.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMany({ skip, take, match }: UserGetManyDto) {
    return this.prisma.user.findMany({
      skip,
      take,
      where: {
        name: {
          contains: match,
        },
      },
    });
  }

  async getOne({ uuid, email }: UserGetOneDto) {
    return this.prisma.user.findUnique({
      where: { uuid, email },
    });
  }

  async create({ name, email, phone, password, role }: UserCreateDto) {
    const candidate = await this.getOne({ email });

    password = await this.getPasswordHash(password);

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    return this.prisma.user.create({
      data: { name, email, phone, password, role },
    });
  }

  async update(
    uuid: string,
    { name, email, phone, password, role }: UserUpdateDto,
  ) {
    const user = await this.getOne({ uuid });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (email && email !== user.email) {
      const candidate = await this.getOne({ email });

      if (candidate) {
        throw new BadRequestException(
          'Пользователь с такой почтой уже существует',
        );
      }
    }

    return this.prisma.user.update({
      where: { uuid },
      data: {
        name,
        email,
        phone,
        password,
        role,
      },
    });
  }

  async delete(uuid: string) {
    const candidate = await this.getOne({ uuid });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден');
    }

    return this.prisma.user.delete({ where: { uuid } });
  }

  private getPasswordHash(password: string) {
    return bcrypt.hash(password, 5);
  }
}
