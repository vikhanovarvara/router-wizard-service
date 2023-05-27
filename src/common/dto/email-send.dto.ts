import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

export class EmailSendDto {
  @IsEmail()
  email: string;

  @IsString()
  subject?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  html?: string;

  @IsDate()
  @IsOptional()
  date?: Date | string;
}
