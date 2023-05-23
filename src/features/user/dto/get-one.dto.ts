import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserGetOneDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
