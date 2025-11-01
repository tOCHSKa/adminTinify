<template>
    <nav class="bg-white shadow-sm">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <RouterLink to="/" class="flex items-center space-x-2">
                    <i data-feather="cloud" class="text-blue-600 w-8 h-8 mr-2"></i>
                    <span class="text-xl font-bold text-blue-800">TinifyCloud</span>
                </RouterLink>
            </div>
            <div class="flex items-center space-x-6">
                <a href="index.html" class="font-medium text-gray-600 hover:text-blue-800">Accueil</a>
                <div class="relative">
                    <div class="flex items-center space-x-2 focus:outline-none">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-8 h-8 rounded-full" alt="Profil">
                        <span class="font-medium">Mon Profil</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted } from 'vue'
import feather from 'feather-icons'
import { RouterLink } from 'vue-router'

onMounted(() => {
    feather.replace()
})
</script>
<style scoped>
</style>