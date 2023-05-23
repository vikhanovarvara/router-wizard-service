import { AppealStatus } from '@prisma/client';

import { IsOptional, IsString } from 'class-validator';

export class AppealCreateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  router: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  status?: AppealStatus;

  @IsString()
  @IsOptional()
  description?: string;
}
