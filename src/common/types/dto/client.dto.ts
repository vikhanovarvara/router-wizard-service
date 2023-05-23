import { IsString } from 'class-validator';

export class ClientDto {
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
}
