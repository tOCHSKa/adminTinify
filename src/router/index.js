// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'
import LoginView from '../views/LoginView.vue'
import TestView from '../views/testView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Forbidden from '../views/Forbidden.vue'

const routes = [
  { path: '/', component: LoginView, meta: { guest: true } },
  { path: '/test', component: TestView, meta: { requiresAuth: true } },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-home', component: () => import('@/views/admin/Home.vue') },
      { path: 'users', name: 'admin-users', component: () => import('@/views/admin/Users.vue') },
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden,
    meta: { guest: true } // pas besoin d'auth pour voir le 403
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const admin = useAdminStore()

  // Rediriger un utilisateur déjà loggé qui veut aller sur une page "guest"
  if (to.meta.guest && admin.isAuthenticated) {
    return next('/test')
  }

  // Vérifier l'authentification
  if (to.meta.requiresAuth && !admin.isAuthenticated) {
    return next('/')
  }

  // Vérifier le rôle admin
  if (to.meta.requiresAdmin && admin.email) {
    // ⚠️ Ici, on suppose que le token contient la clé "role"
    if (admin.role !== 'admin') {
      return next('/forbidden') // ou une page 403
    }
  }

  next()
})

export default router
