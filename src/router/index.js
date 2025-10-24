import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ImageView from '@/views/ImageView.vue'
import TestView from '../views/testView.vue'
import Forbidden from '../views/Forbidden.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfilView from '@/views/ProfilView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView, meta: { guest: true } },
  { path: '/', name: 'home', component: HomeView },
  { path: '/images', name: 'images', component: ImageView },
  { path: '/test', name: 'test', component: TestView, meta: { requiresAuth: true } },
  { path: '/forbidden', name: 'forbidden', component: Forbidden, meta: { guest: true } },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-home', component: () => import('@/views/admin/Home.vue') },
      { path: 'users', name: 'admin-users', component: () => import('@/views/admin/Users.vue') },
    ]
  },
  { path: '/register', name: 'register', component: RegisterView, meta: { guest: true } },
  { path: '/profil', name: 'profil', component: ProfilView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const admin = useAdminStore()

  // Si l’utilisateur n’est pas encore chargé, on le récupère
  if (!admin.isAuthenticated && !admin.loading) {
    await admin.fetchCurrentUser()
  }

  // Si route "guest" et utilisateur connecté → redirige selon le rôle
  if (to.meta.guest && admin.isAuthenticated) {
    return next(admin.role === 'admin' ? '/admin' : '/')
  }

  // Si la route requiert une authentification mais que l’utilisateur n’est pas connecté
  if (to.meta.requiresAuth && !admin.isAuthenticated) {
    return next('/login')
  }

  // Si la route requiert un admin et que le rôle ne correspond pas
  if (to.meta.requiresAdmin && admin.role !== 'admin') {
    return next('/forbidden')
  }

  // Sinon, on laisse passer
  next()
})

export default router
