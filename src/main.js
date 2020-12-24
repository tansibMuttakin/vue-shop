import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './assets/app.scss'
import jquery from 'jquery'
window.$ = window.jquery = jquery
import 'bootstrap'
import 'popper.js'

// vue prime
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// golbal component
import Carousel from 'primevue/carousel';
//crating vue app
const app = createApp(App);

app.component('Carousel',Carousel);
//global component registered - can be used any where

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount('#app');