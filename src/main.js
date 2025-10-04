import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { Icon } from '@iconify/vue'
import { useAdminStore } from './stores/adminStore'
import { createHead } from '@vueuse/head'

async function bootstrap() {
    const app = createApp(App)
    app.use(createPinia());
    app.component('Icon', Icon)
  
    // Récupérer l'utilisateur connecté avant de monter l'app
    const admin = useAdminStore()
    await admin.fetchCurrentUser()
  
    app.use(router)
    app.use(createHead())
    app.mount('#app')
  }
  
  bootstrap()
