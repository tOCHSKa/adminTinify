<template>
      <!-- Navigation -->
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center">
            <i data-feather="cloud" class="text-blue-500 w-8 h-8 mr-2"></i>
            <span class="text-xl font-bold text-blue-600">TinifyCloud</span>
        </div>
        <div class="hidden md:flex space-x-8">
            <a href="#" class="font-medium hover:text-blue-500">Accueil</a>
            <a href="#" class="font-medium hover:text-blue-500">Fonctionnalités</a>
            <a href="#" class="font-medium hover:text-blue-500">Tarifs</a>
            <a href="#" class="font-medium hover:text-blue-500">FAQ</a>
        </div>
        <div class="flex items-center space-x-4">
            <a href="#" class="font-medium hover:text-blue-500 hidden md:block">Connexion</a>
            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200">Commencer</a>
        </div>
        <button class="md:hidden">
            <i data-feather="menu" class="w-6 h-6"></i>
        </button>
    </nav>
</template>

<script setup>
</script>

<style scoped>
</style>