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
            class="absolute left-0 top-full mt-0 w-44 bg-white shadow-lg rounded-md z-50 transition-all duration-200"
          >
            <a
              href="/images"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
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
        >Mon compte</a>
        <button
          class="font-medium hover:text-blue-500 hidden md:block"
          @click="admin.logout"
        >
          Déconnexion
        </button>
      </div>
  
      <!-- Menu mobile -->
      <button class="md:hidden">
        <i data-feather="menu" class="w-6 h-6"></i>
      </button>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAdminStore } from '@/stores/adminStore'
  
  // Store utilisateur
  const admin = useAdminStore()
  admin.fetchCurrentUser()
  
  // État du sous-menu
  const open = ref(false)
  
  const openMenu = () => (open.value = true)
  const closeMenu = () => (open.value = false)
  const toggleMenu = () => (open.value = !open.value)
  
  // Scroll vers une section
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  </script>
  
  <style scoped>
  /* Optionnel : petit effet de fade sur le dropdown */
  [ v-cloak ] { display: none; }
  </style>
  