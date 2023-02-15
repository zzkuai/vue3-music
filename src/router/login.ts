import { RouteRecordRaw } from 'vue-router';

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/login/verify',
    name: 'LoginVerify',
    component: () => import('@/pages/login/verify.vue'),
  },
];
