<template>
    <aside class="bg-white shadow-md h-screen p-4 flex flex-col">
      <nav class="flex-1">
        <RouterLink
          to="/admin"
          class="flex items-center p-2 rounded hover:bg-gray-200"
        >
          <Icon icon="mdi:view-dashboard" class="mr-2" />
          Dashboard
        </RouterLink>
        <RouterLink
          to="/admin/users"
          class="flex items-center p-2 rounded hover:bg-gray-200 mt-2"
        >
          <Icon icon="mdi:account-multiple" class="mr-2" />
          Utilisateurs
        </RouterLink>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  </script>
  