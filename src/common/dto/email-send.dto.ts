import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

export class EmailSendDto {
  @IsEmail()
  email: string;

  @IsString()
  subject?: string;

  @IsString()
  text: string;

  @IsString()
  html?: string;

  @IsDate()
  @IsOptional()
  date?: Date | string;
}
