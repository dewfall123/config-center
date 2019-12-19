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

  config.dbConfig = {
    url: `mongodb://172.25.100.24:27017/config`,
    collection: 'schemas',
    schema: {
      url: { type: 'string' },
      name: { type: 'string' }, // colection
      fields: { type: 'object' },
      project: { type: 'string' }, // 所属项目
      auth: { type: 'array' }, // 哪些角色有权限
    },
  };

  return config;
};
