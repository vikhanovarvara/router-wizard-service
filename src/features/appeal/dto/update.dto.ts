import { AppealStatus } from '@prisma/client';

import { IsOptional, IsString } from 'class-validator';

export class AppealUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  router?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  status?: AppealStatus;

  @IsString()
  @IsOptional()
  description?: string;
}
