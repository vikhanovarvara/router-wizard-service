import { IsOptional, IsUUID } from 'class-validator';

export class AppealGetOneDto {
  @IsUUID()
  @IsOptional()
  uuid: string;
}
