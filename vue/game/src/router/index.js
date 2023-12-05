import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import LoginScreen from '../components/LoginScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import LandingScreen from '../components/LandingScreen.vue';
import LobbyScreen from '../components/LobbyScreen.vue';
import ScoreScreen from '../components/ScoreScreen.vue';
import GameScreenMult from '../components/GameScreenMult.vue';

const isAuthenticated = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/user-profile');
    return response.status === 200;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: LoginScreen,
    },
    {
      path: '/GameScreen',
      name: 'game',
      component: GameScreen,

      beforeEnter: async (to, from, next) => {
        try {
          if (await isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          next('/login'); 
        }
      },

    },
    {
      path: '/register',
      name: 'register',
      component: RegisterScreen,
    },
    {
      path: '/Lobby',
      name: 'lobby',
      component: LobbyScreen,

      beforeEnter: async (to, from, next) => {
        try {
          if (await isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          next('/login'); 
        }
      },

    },
    {
      path: '/',
      name: 'landingpage',
      component: LandingScreen,
    },
    {
      path: '/scores',
      name: 'ScoreScreen',
      component: ScoreScreen,

      beforeEnter: async (to, from, next) => {
        try {
          if (await isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          next('/login'); 
        }
      },

    },
    {
      path: '/GameScreenMult',
      name: 'GameMult',
      component: GameScreenMult,

      beforeEnter: async (to, from, next) => {
        try {
          if (await isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          next('/login'); 
        }
      },
      
    },
  ],
});

export default router;
