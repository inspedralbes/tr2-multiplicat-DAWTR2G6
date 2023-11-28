// index.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import Votacions from '../components/VotacionsScreen.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginScreen,
    },
    {
      path: '/Votacions',
      name: 'Votacions',
      component: Votacions,
    },
    {
      path: '/juego',
      name: 'juego',
      component: Juego,
    },
  ],
});

export default router;
