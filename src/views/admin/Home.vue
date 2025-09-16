<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-4 shadow rounded text-center">
          <h3 class="text-lg">Total Utilisateurs</h3>
          <p class="text-3xl font-bold">{{ store.users.length }}</p>
        </div>
        <div class="bg-white p-4 shadow rounded text-center">
          <h3 class="text-lg">Admins</h3>
          <p class="text-3xl font-bold">{{ store.admins.length }}</p>
        </div>
        <div class="bg-white p-4 shadow rounded text-center">
          <h3 class="text-lg">Users</h3>
          <p class="text-3xl font-bold">{{ store.regularUsers.length }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  
  const store = useUserStore()
  onMounted(() => {
    if (!store.users.length) store.fetchUsers()
  })
  </script>
  