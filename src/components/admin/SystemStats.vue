<template>
    <div class="bg-white rounded-2xl p-4 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Statistiques Fichiers</h2>
  
      <ul class="space-y-3">
        <li class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <i data-feather="image" class="w-5 h-5 text-blue-600 mr-2"></i>
            <span>Images</span>
          </div>
          <span class="font-semibold text-gray-800">20</span>
        </li>
  
        <li class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <i data-feather="film" class="w-5 h-5 text-green-600 mr-2"></i>
            <span>Vidéos</span>
          </div>
          <span class="font-semibold text-gray-800">60</span>
        </li>
  
        <li class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <i data-feather="database" class="w-5 h-5 text-purple-600 mr-2"></i>
            <span>Taille Totale</span>
          </div>
          <span class="font-semibold text-gray-800">80 GB</span>
        </li>
  
        <li class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <i data-feather="download" class="w-5 h-5 text-orange-500 mr-2"></i>
            <span>Téléchargements</span>
          </div>
          <span class="font-semibold text-gray-800">80</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import feather from 'feather-icons'
  
  onMounted(() => {
    feather.replace()
  })
  </script>
  
  <style scoped>
  </style>
  