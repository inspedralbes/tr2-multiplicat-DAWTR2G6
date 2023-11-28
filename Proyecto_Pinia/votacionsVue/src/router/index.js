import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import VotacionsScreen from '../components/VotacionsScreen.vue';
import lp from '../components/lp.vue';
import login from '../components/login.vue';
import register from '../components/register.vue';
import blockgame from '../components/blockgame.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginScreen
    },
    {
      path: '/votacions',
      name: 'votacions',
      component: VotacionsScreen
    },
    {
      path: '/lp',
      name: 'lp',
      component: lp
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/block-game',
      name: 'blockgame',
      component: blockgame
    }

  ]
})

export default router
