<template>
    <NavProf />
<div class="bg-gray-50">
  <div class="container mx-auto px-6 py-8 flex flex-col md:flex-row">
    <div class="md:w-1/4 mb-8 md:mb-0 md:pr-8">
      <Sidebar />
    </div>
    <div class="md:w-3/4">
        <ProfilInfo />
      <StatsInfo />
    </div>

  </div>
</div>
</template>

<script setup>
import Sidebar from '../components/profil/Sidebar.vue'
import StatsInfo from '../components/profil/StatsInfo.vue'
import ProfilInfo from '../components/profil/ProfilInfo.vue'
import NavProf from '../components/profil/NavProf.vue'

feather.replace();
</script>

<style scoped>
</style>