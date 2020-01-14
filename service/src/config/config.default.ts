import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_dew';

  // add your config here
  config.middleware = [];

  config.static = {
    maxAge: 31536000,
    prefix: '/public',
  };

  config.view = {
    cache: false,
    defaultViewEngine: 'static',
    mapping: {
      '.html': 'static',
    },
  };

  config.security = {
    csrf: true,
  };

  config.dbConfig = {
    url: `mongodb://172.25.100.24:27017`,
    dbName: 'config',
    collectionName: 'schemas',
    fields: {
      url: { type: 'string' },
      dbName: { type: 'string' },
      collectionName: { type: 'string' },
      fields: { type: 'object' },
      meta: {
        name: { type: 'string' },
        describe: { type: 'string' },
        icon: { type: 'string' },
      }
    },
  };

  return config;
};
