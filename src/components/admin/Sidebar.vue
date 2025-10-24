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
      <div class="relative">
        <!-- Bouton Déconnexion -->
        <RouterLink
          to="#"
          @click.prevent="handleLoggedOut"
          class="flex items-center rounded hover:bg-gray-600 mt-auto text-red-600 mx-2 p-2"
        >
          <Icon icon="mdi:logout" class="mr-2" />
          Déconnexion
        </RouterLink>

        <!-- Popup confirmation -->
        <div v-if="loggedOut" class="bg-gray-700 text-white p-3 rounded shadow-md mt-2 mx-2">
          <p class="mb-2 text-sm">Êtes-vous sûr de vouloir vous déconnecter ?</p>
          <div class="flex justify-end space-x-2">
            <button
              @click="handleLoggedOut"
              class="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-sm"
            >
              Non
            </button>
            <button
              @click="handleLogout"
              class="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </nav>


  </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useAdminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'
import { ref, inject } from 'vue'

// --- Store utilisateur ---
// Permet d'accéder aux informations de l'utilisateur connecté et aux actions de connexion/déconnexion
const adminStore = useAdminStore()

// --- Router ---
// Utilisé pour la navigation programmée après déconnexion
const router = useRouter()

// --- Références ---
// Référence pour gérer l'affichage du toast global
const toastRef = inject('toast')

// Booléen réactif pour indiquer si l'utilisateur a cliqué sur "Déconnexion" (confirmation ou UI)
const loggedOut = ref(false)

/**
 * Toggle de l'état de déconnexion (affichage du message de confirmation ou UI)
 */
const handleLoggedOut = () => {
  loggedOut.value = !loggedOut.value
}

/**
 * Déconnexion de l'utilisateur
 * 1. Appelle la méthode logout du store pour réinitialiser l'état utilisateur
 * 2. Affiche un toast pour informer l'utilisateur
 * 3. Redirige vers la page d'accueil
 */
const handleLogout = () => {
  adminStore.logout()
  toastRef.value?.showToast('🔒 Vous êtes maintenant déconnecté')
  router.push('/')
}


</script>
