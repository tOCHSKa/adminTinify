<template>
      <!-- Navigation -->
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center">
            <i data-feather="cloud" class="text-blue-800 w-8 h-8 mr-2"></i>
            <span class="text-xl font-bold text-blue-800">TinifyCloud</span>
        </div>
        <div class="hidden md:flex space-x-8">
            <a href="/" class="font-medium hover:text-blue-500">Accueil</a>
            <a href="/images" class="font-medium hover:text-blue-500">Images</a>
            <a href="/videos" class="font-medium hover:text-blue-500">Vidéos</a>
            <a href="javascript:void(0)" class="font-medium hover:text-blue-500" @click="scrollToSection('faq')">FAQ</a>
        </div>
        <div class="flex items-center space-x-4" v-if="!admin.isAuthenticated">
            <a href="/logadmin" class="font-medium hover:text-blue-500 hidden md:block">Connexion</a>
            <a href="/register" class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition duration-200 hover:scale-105">Commencer</a>
        </div>
        <div class="flex items-center space-x-4" v-else>
            <a href="/profil" class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition duration-200 hover:scale-105">Mon compte</a>
            <button class="font-medium hover:text-blue-500 hidden md:block" @click="admin.logout">Déconnexion</button>
        </div>
        
        <button class="md:hidden">
            <i data-feather="menu" class="w-6 h-6"></i>
        </button>
    </nav>
</template>

<script setup>

import { useAdminStore } from '@/stores/adminStore'
const admin = useAdminStore();

admin.fetchCurrentUser();

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
</style>