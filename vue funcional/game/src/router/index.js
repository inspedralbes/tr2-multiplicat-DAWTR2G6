import {
  createRouter,
  createWebHistory
} from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import LandingScreen from '../components/LandingScreen.vue';
import LobbyScreen from '../components/LobbyScreen.vue';
import ScoreScreen from '../components/ScoreScreen.vue';
import ScoreScreeMult from '../components/ScoreScreenMult.vue';
import GameScreenMult from '../components/GameScreenMult.vue';



const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/login',
      name: 'home',
      component: LoginScreen,
    },
    {
      path: '/scoresMult/:id',
      name: 'scoresMulti',
      component: ScoreScreeMult,
      props: true,
    },
    {
      path: '/GameScreen',
      name: 'game',
      component: GameScreen,

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
      props: true,
    },
    {
      path: '/GameScreenMult',
      name: 'GameMult',
      component: GameScreenMult,

    },
  ],
});


// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = useStore().$state.isloggedIn;

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// });

export default router;