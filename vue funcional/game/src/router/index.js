import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import LandingScreen from '../components/LandingScreen.vue';
import LobbyScreen from '../components/LobbyScreen.vue';
import ScoreScreen from '../components/ScoreScreen.vue';
import GameScreenMult from '../components/GameScreenMult.vue';
import ScoreScreenMult from '../components/ScoreScreenMult.vue';

const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  return authToken !== null;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginScreen,
    },
    {
      path: '/',
      name: 'landingpage',
      component: LandingScreen,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterScreen,
    },
    {
      path: '/scores',
      name: 'ScoreScreen',
      component: ScoreScreen,
      meta: { requiresAuth: true },
    },
    {
      path: '/scoresMult/:id',
      name: 'scoresMulti',
      component: ScoreScreenMult,
      meta: { requiresAuth: true },
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyScreen,
      meta: { requiresAuth: true },
    },
    {
      path: '/GameScreen',
      name: 'game',
      component: GameScreen,
      meta: { requiresAuth: true },
    },
    {
      path: '/GameScreenMult',
      name: 'GameMult',
      component: GameScreenMult,
      meta: { requiresAuth: true },
    },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
