import { defineConfig, IConfig } from 'umi';

export default defineConfig({
  outputPath: '../service/src/app/public/',
  publicPath: '/public/',
  dynamicImport: {},
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/home', component: '@/pages/home' },
        { path: '/curd/:id', component: '@/pages/curd' },
      ],
    },
  ],

  hash: true,
  history: {
    type: 'hash',
  },

  tailwindcss: {
  },
});
