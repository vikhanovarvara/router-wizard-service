import { config } from 'dotenv';

import { NodeEnv } from '../types/app';

config();

export const getRequiredEnvsByNodeEnv = (
  envs: { [key in NodeEnv | 'common']?: string[] },
  nodeEnv: NodeEnv,
): string[] => {
  const { common = [] } = envs;
  const envsByNodeEnv = envs[nodeEnv] || [];
  return [...common, ...envsByNodeEnv];
};

export const env = (key: string) => process.env[key];
