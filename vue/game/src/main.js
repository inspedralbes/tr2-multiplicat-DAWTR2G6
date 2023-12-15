import './assets/main.css'; // Corrected the path for main.css

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Corrected the path for primeflex.css
import 'primeflex/primeflex.css';

import 'primevue/resources/themes/lara-light-green/theme.css';

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';

app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);

app.mount('#app');
