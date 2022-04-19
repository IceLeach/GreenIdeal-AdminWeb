import { defineConfig } from 'umi';
import routes from './routes';
export default defineConfig({
  hash: true,
  title: false,
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  targets: {
    ie: 11,
  },
  antd: {},
  routes: routes,
  //define: {},
  nodeModulesTransform: {
    type: 'none',
    // exclude: [],
  },
  // history: { type: 'hash' },
  // base: '/dist',
  // exportStatic: {},
  publicPath: '/',
  // externals: { 'AMap': 'window.AMap' },
});
