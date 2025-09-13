import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import testView from '../views/testView.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/test',
    name: 'test',
    component: testView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
