<template>
    <div class="min-h-screen flex bg-gray-100">
      <!-- Barre latérale -->
      <Sidebar class="w-64 hidden md:block" />
  
      <!-- Contenu principal -->
      <div class="flex-1 flex flex-col">
        <!-- En-tête -->
        <Header />
  
        <!-- Zone centrale (vue enfant) -->
        <main class="flex-1 p-6 overflow-y-auto">
          <RouterView />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/admin/Sidebar.vue'
  import Header from '@/components/admin/Header.vue'
  </script>
  
  <style scoped>
  /* Facultatif : tu peux ajuster l’affichage mobile ici si besoin */
  </style>
  