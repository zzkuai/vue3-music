import { createWebHistory, createRouter } from 'vue-router';
import { homeRoutes } from './home';
import { loginRoutes } from './login';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...homeRoutes,
    ...loginRoutes,
  ],
});

export { router };
