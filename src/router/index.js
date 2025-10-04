// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'
import LoginView from '../views/LoginView.vue'
import TestView from '../views/testView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Forbidden from '../views/Forbidden.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/logadmin', component: LoginView, meta: { guest: true } },
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
    meta: { guest: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const admin = useAdminStore()

  // Si le store n'a pas encore fetché l'utilisateur, le faire
  if (!admin.isAuthenticated && !admin.loading) {
    await admin.fetchCurrentUser()
  }

  // Rediriger un utilisateur déjà connecté vers /admin si c'est une route guest
  if (to.meta.guest && admin.isAuthenticated) {
    return next(admin.role === 'admin' ? '/logadmin' : '/test')
  }

  // Rediriger si la route nécessite une authentification mais que l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !admin.isAuthenticated) {
    return next('/logadmin')
  }

  // Vérifier le rôle admin pour les routes admin
  if (to.meta.requiresAdmin && admin.isAuthenticated) {
    if (admin.role !== 'admin') {
      return next('/forbidden')
    }
  }

  next()
})

export default router
