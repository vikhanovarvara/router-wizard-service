import { IsOptional, IsUUID } from 'class-validator';

export class GetOneDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
