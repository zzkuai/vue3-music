import { createWebHistory, createRouter } from 'vue-router';
import { homeRoutes } from './home';
import { loginRoutes } from './login';
import { userRoutes } from './user';

const router = createRouter({
  history: createWebHistory('vue3-music'),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...homeRoutes,
    ...userRoutes,
    ...loginRoutes,
  ],
  scrollBehavior(_to, _from, savedPosition) {
    console.log('savedPosition', savedPosition);

    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export { router };
