import { EggPlugin } from 'midway';
export default {
  static: true, // default is true
  viewStatic: {
      enable: true,
      package: 'egg-view-static',
  },
} as EggPlugin;
