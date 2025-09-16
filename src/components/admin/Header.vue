<template>
  <header class="bg-white shadow flex items-center justify-between px-6 py-4">
    <!-- Titre / section dynamique -->
    <h1 class="text-xl font-semibold">
      Administration
    </h1>

    <!-- Actions / recherche et utilisateur -->
    <div class="flex items-center space-x-4">
      <!-- Recherche (optionnel) -->
      <div class="relative">
        <input
          type="text"
          placeholder="Rechercher..."
          class="border rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon icon="mdi:magnify" />
        </span>
      </div>

      <!-- Info utilisateur -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-700">
          {{ adminStore.shortEmail }}
        </span>
        <span
          class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium"
        >
          {{ adminStore.role || 'user' }}
        </span>
      </div>
    </div>
  </header>
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
