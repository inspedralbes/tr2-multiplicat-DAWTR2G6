import {
  createRouter,
  createWebHistory
} from 'vue-router';
import LoginScreen from '../components/LoginScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';
import GameScreen from '../components/GameScreen.vue';
import LandingScreen from '../components/LandingScreen.vue';
import LobbyScreen from '../components/LobbyScreen.vue';
import Post_Juego from '../components/Post_Juego.vue';


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
    path: '/login',
    name: 'home',
    component: LoginScreen
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
    path: '/Lobby',
    name: 'lobby',
    component: LobbyScreen
  },
  {
    path: '/',
    name: 'landingpage',
    component: LandingScreen
  }, {
    path: '/post-juego-screen',
    name: 'post-juego',
    component: Post_Juego
  }


  ]
})

export default router