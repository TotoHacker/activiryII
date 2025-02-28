import { createRouter, createWebHistory } from 'vue-router'
import homemain from '@/views/homemain.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'homemain',
      component: homemain,
    },
  ],
})

export default router
