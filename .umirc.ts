import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      layout: false,
      component: './Login',
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '测试页面',
      path: '/test',
      component: './Test',
    },
    {
      name: 'antd测试页面',
      path: '/antd-test',
      component: './AntdTest',
    },
    {
      name: 'ProComponents测试页面',
      path: '/procom-test',
      component: './ProComTest',
    },
    {
      name: 'ahooks测试页面',
      path: '/ahooks-test',
      component: './AhooksTest',
    },
    {
      name: 'TsTest测试页面',
      path: 'ts-test',
      component: './TsTest',
    },
    {
      name: 'Refs测试页面',
      path: 'ref-test',
      component: './RefTest',
    },
    {
      name: 'HooksTest实现测试页面',
      path: 'hooks-test',
      component: './HooksTest',
    },
    // {
    //   name: '拖拽排序',
    //   path: 'drag-sort-table',
    //   component: './DragSortTable',
    // },
    {
      name: '拖拽排序pro',
      path: 'drag-sort-table-pro',
      component: './DragSortTablePro',
    },
    {
      name: '打印test',
      path: 'print-test',
      component: './PrintTest',
    },
    {
      layout: false,
      component: '@/pages/404',
    },
  ],
  fastRefresh: {},
});
