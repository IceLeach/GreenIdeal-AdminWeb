import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';

export default defineConfig({
  hash: true,
  title: false,
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  targets: {
    ie: 11,
  },
  antd: {
    dark: true,
  },
  routes: routes,
  theme: theme,
  //define: {},
  nodeModulesTransform: {
    type: 'none',
    // exclude: [],
  },
  ignoreMomentLocale: true,
  // history: { type: 'hash' },
  // base: '/dist',
  // exportStatic: {},
  publicPath: '/',
  fastRefresh: {},
  // externals: { 'AMap': 'window.AMap' },
});
