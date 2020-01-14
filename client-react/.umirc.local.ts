import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
    },
  },
};

export default config;
