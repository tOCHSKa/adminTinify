<template>
  <aside class="bg-gray-800 shadow-md h-screen w-64 flex flex-col justify-between">
    <!-- Navigation scrollable -->
    <nav class="flex flex-col overflow-y-auto p-4 text-white">
      <!-- Dashboard -->
      <RouterLink
        to="/admin"
        class="flex items-center p-2 rounded hover:bg-gray-600 mb-2"
      >
        <Icon icon="mdi:view-dashboard" class="mr-2" />
        Dashboard
      </RouterLink>

      <!-- Gestion des fichiers -->
      <div class="mt-4">
        <p class="text-white-500 uppercase text-xs mb-1 px-2">Fichiers</p>
        <RouterLink
          to="/admin/images"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
          <Icon icon="mdi:image" class="mr-2" />
          Images
        </RouterLink>
        <RouterLink
          to="/admin/videos"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2 mt-1"
        >
          <Icon icon="mdi:video" class="mr-2" />
          Vidéos
        </RouterLink>
      </div>

      <!-- Utilisateurs -->
      <div class="mt-4">
        <p class="text-white-500 uppercase text-xs mb-1 px-2">Utilisateurs</p>
        <RouterLink
          to="/admin/users"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
          <Icon icon="mdi:account-multiple" class="mr-2" />
          Liste des utilisateurs
        </RouterLink>
      </div>

      <!-- Analytics -->
      <div class="mt-4">
        <p class="text-white uppercase text-xs mb-1 px-2">Analytics</p>
        <RouterLink
          to="/admin/analytics"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
          <Icon icon="mdi:chart-bar" class="mr-2" />
          Rapports
        </RouterLink>
      </div>

      <!-- Paramètres -->
      <div class="mt-4">
        <p class="text-white uppercase text-xs mb-1 px-2">Paramètres</p>
        <RouterLink
          to="/admin/settings"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
          <Icon icon="mdi:cog" class="mr-2" />
          Paramètres
        </RouterLink>
      </div>

      <!-- Support -->
      <div class="mt-4">
        <p class="text-white uppercase text-xs mb-1 px-2">Support</p>
        <RouterLink
          to="/admin/help"
          class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
          <Icon icon="mdi:help-circle" class="mr-2" />
          Aide
        </RouterLink>
      </div>
      <div class="">
        <!-- Déconnexion -->
        <RouterLink
        to="/"
        class="flex items-center p-2 rounded hover:bg-gray-600 ml-2"
        >
        Accueil
      </RouterLink>
      </div>
      <div class="">
        <!-- Déconnexion -->
        <RouterLink
        to="/"
        class="flex items-center rounded hover:bg-gray-600 mt-auto text-red-600 mx-2 p-2"
        >
        <Icon icon="mdi:logout" class="mr-2" />
        Déconnexion
      </RouterLink>
      </div>
    </nav>


  </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useAdminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'

const adminStore = useAdminStore()
const router = useRouter()

const handleLogout = () => {
  adminStore.logout()
  router.push('/')
}
</script>
