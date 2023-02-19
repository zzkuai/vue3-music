import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'UserIndex',
    meta: {
      tab: true,
    },
    component: () => import('@/pages/user/index.vue'),
  },
];
