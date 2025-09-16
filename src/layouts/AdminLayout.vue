<template>
    <div class="min-h-screen flex bg-gray-100">
      <Sidebar class="w-64" />
  
      <div class="flex-1 flex flex-col">
        <Header />
        <main class="p-6 flex-1 overflow-y-auto">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/admin/Sidebar.vue'
  import Header from '@/components/admin/Header.vue'
  </script>
  