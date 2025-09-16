<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Bienvenue, {{ admin.email }}</h2>
      <p class="text-gray-700">
        Voici un aperçu rapide de votre application.
      </p>
    </div>
  </template>
  
  <script setup>
  import { useAdminStore } from '@/stores/adminStore'
  const admin = useAdminStore()
  </script>
  