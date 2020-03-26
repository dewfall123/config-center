import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/home', component: '@/pages/home' },
      ]
    }
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
});
