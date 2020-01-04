import { EggAppInfo } from 'midway';
import { DefaultConfig } from './config.default';

export const development = {
  watchDirs: [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts',
  ],
  overrideDefault: true,
};

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.security = {
    csrf: false,
  };

  return config;
};
