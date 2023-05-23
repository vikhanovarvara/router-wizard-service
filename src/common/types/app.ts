import { User } from '@prisma/client';
import { Request } from 'express';

export type NodeEnv = 'development' | 'production' | 'local';

export interface AppRequest extends Request {
  user?: User;
  token?: string;
}
