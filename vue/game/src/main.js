import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

const app = createApp(App)


// Import the Socket.io client library
import io from 'socket.io-client';

// Connect to the Socket.io server
const socket = io('http://localhost:3333'); // Replace with your server URL

// Example: Listen for the 'updatePlayers' event
socket.on('updatePlayers', (players) => {
  console.log('Llista de jugadors:', players);
  // Handle the updated player list in your Vue component
});



import 'primevue/resources/themes/lara-light-green/theme.css'

import Button from "primevue/button"
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';




import '/node_modules/primeflex/primeflex.css'
app.use(PrimeVue);
app.use(createPinia())
app.use(router)



app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);


app.mount('#app')
