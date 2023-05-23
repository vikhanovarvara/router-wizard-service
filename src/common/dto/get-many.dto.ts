import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetManyDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsString()
  @IsOptional()
  match?: string;
}
