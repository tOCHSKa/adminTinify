// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'
import LoginView from '../views/LoginView.vue'
import TestView from '../views/testView.vue'

const routes = [
  { path: '/', component: LoginView, meta: { guest: true } },
  { path: '/test', component: TestView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const admin = useAdminStore()

  if (to.meta.guest && admin.isAuthenticated) {
    return next('/test')
  }

  if (to.meta.requiresAuth && !admin.isAuthenticated) {
    return next('/')
  }

  next()
})

export default router
