import { createRouter, createWebHistory } from 'vue-router';
import LoginPageComponent from '@/views/LoginPage.vue';
import HomePageComponent from '@/views/HomePage.vue';
import NotFoundComponent from '@/views/NotFoundpage.vue';
import XssExample from '@/components/examples/XssExample.vue';
import SqlExample from '@/components/examples/sqlExample.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPageComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomePageComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/xss',
      name: 'xss',
      component: XssExample,
      meta: { requiresAuth: true }
    },
    {
      path: '/sql',
      name: 'sql',
      component: SqlExample,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundComponent,

    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router;
