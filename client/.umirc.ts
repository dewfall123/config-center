import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  // plugins: ['./src/plugins/tailwind'],
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

  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

});
