<template>
    <!-- <div>
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
    </div> -->
    <!-- 📊 Grid layout -->
    <div class="grid grid-cols-12 gap-6">
      <!-- 🧱 Stat Cards -->
      <div class="col-span-3">
        <!-- <StatCard title="Total des fichiers" value="100" /> -->
         <StatCard title="Total des fichiers" value="100" />
      </div>
      <div class="col-span-3">
        <!-- <StatCard title="Taille totale compressée" value="50 GB" /> -->
         <StatCard title="Taille totale compressée" value="50 GB" />
      </div>
      <div class="col-span-3">
        <!-- <SystemStats /> -->
         <Logo />
      </div>
      <div class="col-span-3">
        <SystemStats />
      </div>

      <!-- 📈 Graphiques et stats -->
      <div class="col-span-7">
        <!-- <DownloadChart /> -->
      </div>
      <div class="col-span-5">
        <!-- <FileDistributionChart /> -->
      </div>

      <!-- 👥 Liste des utilisateurs -->
      <div class="col-span-7">
        <!-- <UserList /> -->
      </div>

      <!-- 📁 Fichiers récents -->
      <div class="col-span-5">
        <!-- <RecentFiles /> -->
      </div>

      <!-- 🆘 Support section -->
      <div class="col-span-12">
        <!-- <SupportSection /> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import StatCard from '@/components/admin/StatCard.vue'
  import Logo from '@/components/admin/Logo.vue'
  import SystemStats from '@/components/admin/SystemStats.vue'
  
  const store = useUserStore()
  onMounted(() => {
    if (!store.users.length) store.fetchUsers()
  })
  </script>
  