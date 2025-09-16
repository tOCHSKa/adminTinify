import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { Icon } from '@iconify/vue'
import { useAdminStore } from './stores/adminStore'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('Icon', Icon)

// Initialiser le store AVANT d’utiliser le router
const admin = useAdminStore()
admin.initializeStore()

app.mount('#app');
