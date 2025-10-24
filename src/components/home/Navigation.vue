<template>

    <!-- Navigation -->
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center relative">
      <!-- Logo -->
      <div class="flex items-center">
        <i data-feather="cloud" class="text-blue-800 w-8 h-8 mr-2"></i>
        <span class="text-xl font-bold text-blue-800">TinifyCloud</span>
      </div>
  
      <!-- Menu principal -->
      <div class="hidden md:flex space-x-8 relative">
        <a href="/" class="font-medium hover:text-blue-500">Accueil</a>
  
        <!-- Lien avec sous-menu (solution JS) -->
        <div
          class="relative"
          @mouseenter="openMenu"
          @mouseleave="closeMenu"
        >
          <a
            href="#"
            class="font-medium hover:text-blue-500 flex items-center"
            @click.prevent="toggleMenu"
          >
            Compresser
            <svg
              class="ml-1 w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              :class="{ 'rotate-180': open }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
  
          <!-- Sous-menu -->
          <div
            v-show="open"
            class="absolute left-0 top-full mt-0 w-44 bg-white shadow-lg rounded-lg z-50 transition-all duration-200"
          >
            <a
              href="/images"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 "
            >
              Compresser images
            </a>
            <a
              href="/videos"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Compresser vidéos
            </a>
          </div>
        </div>
  
        <a
          href="javascript:void(0)"
          class="font-medium hover:text-blue-500"
          @click="scrollToSection('faq')"
        >
          FAQ
        </a>
      </div>
  
      <!-- Boutons de connexion / compte -->
      <div class="flex items-center space-x-4" v-if="!admin.isAuthenticated">
        <a
          href="/login"
          class="font-medium hover:text-blue-500 hidden md:block"
        >Connexion</a>
        <a
          href="/register"
          class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition duration-200 hover:scale-105"
        >Commencer</a>
      </div>
  
      <div class="flex items-center space-x-4" v-else>
        <a
          href="/profil"
          class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition duration-200 hover:scale-105"
        >
          Mon compte
        </a>

        <!-- Bouton Déconnexion avec confirmation -->
        <div class="relative">
          <button
            class="font-medium hover:text-blue-500 hidden md:block"
            @click="toggleLogoutConfirm"
          >
            Déconnexion
          </button>

          <!-- Popup confirmation -->
          <div
            v-if="showLogoutConfirm"
            class="absolute right-0 mt-8 w-48 bg-white shadow-lg rounded-md p-3 z-50 text-gray-800"
          >
            <p class="text-sm mb-2">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div class="flex justify-end space-x-2">
              <button
                @click="toggleLogoutConfirm"
                class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Non
              </button>
              <button
                @click="handleLogout"
                class="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Menu mobile -->
      <button class="md:hidden">
        <i data-feather="menu" class="w-6 h-6"></i>
      </button>
    </nav>
  </template>
  
  <script setup>
import { ref, inject } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'

/**
 * Store utilisateur
 * Permet de gérer l'état de l'utilisateur connecté et d'appeler les méthodes de login/logout
 */
const admin = useAdminStore()
// Récupère les infos de l'utilisateur connecté dès le montage
admin.fetchCurrentUser()

/** Router Vue pour naviguer entre les pages */
const router = useRouter()

/** État du sous-menu utilisateur */
const open = ref(false)                  // Menu ouvert ou fermé
const showLogoutConfirm = ref(false)     // Affichage de la confirmation de logout

/** --- Fonctions de gestion du menu utilisateur --- */
const openMenu = () => (open.value = true)
const closeMenu = () => (open.value = false)
const toggleMenu = () => (open.value = !open.value)

/**
 * Scroll vers une section spécifique de la page
 * @param {string} id - ID de l'élément à atteindre
 */
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/** Affiche ou masque la confirmation de logout */
const toggleLogoutConfirm = () => {
  showLogoutConfirm.value = !showLogoutConfirm.value
}

/** Référence au système de notifications (toast) */
const toastRef = inject('toast')

/**
 * Déconnexion de l'utilisateur
 * Met à jour le store, affiche un toast et redirige vers la page d'accueil
 */
const handleLogout = () => {
  admin.logout()                          // Appel de la méthode logout du store
  toastRef.value?.showToast('🔒 Vous êtes maintenant déconnecté')
  router.push('/')                        // Redirection vers la home
}

  </script>
  
  <style scoped>
  /* Optionnel : petit effet de fade sur le dropdown */
  [ v-cloak ] { display: none; }
  </style>
  