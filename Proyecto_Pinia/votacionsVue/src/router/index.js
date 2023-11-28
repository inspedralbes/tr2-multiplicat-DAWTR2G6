import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import VotacionsScreen from '../components/VotacionsScreen.vue';


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
    }
   
  ]
})

export default router
