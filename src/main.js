import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);

app.use(createPinia()); // <-- Ajoute Pinia ici
app.use(router);

app.mount('#app');
