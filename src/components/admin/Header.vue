<template>
    <header class="bg-white shadow flex items-center justify-between px-6 py-4">
      <h1 class="text-xl font-semibold">Administration</h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:scale-[1.05] transition"
      >
        Déconnexion
      </button>
    </header>
  </template>
  
  <script setup>
  import { useAdminStore } from '@/stores/adminStore'
  import { useRouter } from 'vue-router'
  
  const admin = useAdminStore()
  const router = useRouter()
  
  function logout() {
    admin.logout()
    router.push('/')
  }
  </script>
  