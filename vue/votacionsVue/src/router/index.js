import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import VotacionsScreen from '../components/VotacionsScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import Juego from '../components/Juego.vue';


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
      path: '/GameScreen',
      name: 'game',
      component: GameScreen
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterScreen
    },
    {
      path: '/Juego',
      name: 'Juego',
      component: Juego
    },
    {
      path: '/api-fetch',
      name: 'api-fetch',
      component: ApiFetch
=======
>>>>>>> api-fetch:vue/votacionsVue/src/router/index.js
    },
  ]
})

export default router
