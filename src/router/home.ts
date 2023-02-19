import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      tab: true,
    },
    component: () => import('@/pages/home/index.vue'),
  },
];
