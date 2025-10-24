<template>
<div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex flex-col items-center mb-6">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-20 h-20 rounded-full mb-4" alt="Profil">
        <h3 class="text-lg font-bold">{{ adminStore.fullName }}</h3>
        <p class="text-gray-500 text-sm">Membre depuis {{ adminStore.createdAt }}</p>
    </div>
    <div class="space-y-2">
        <a href="#" class="sidebar-item active flex items-center p-3 rounded-lg">
            <i data-feather="user" class="w-5 h-5 mr-3"></i>
            <span>Mon profil</span>
        </a>
        <a href="images.html" class="sidebar-item flex items-center p-3 rounded-lg">
            <i data-feather="image" class="w-5 h-5 mr-3"></i>
            <span>Compresser images</span>
        </a>
        <a href="#" class="sidebar-item flex items-center p-3 rounded-lg">
            <i data-feather="settings" class="w-5 h-5 mr-3"></i>
            <span>Paramètres</span>
        </a>
        <a href="#" class="sidebar-item flex items-center p-3 rounded-lg">
            <i data-feather="credit-card" class="w-5 h-5 mr-3"></i>
            <span>Abonnement</span>
        </a>
        <a href="#" class="sidebar-item flex items-center p-3 rounded-lg">
            <i data-feather="help-circle" class="w-5 h-5 mr-3"></i>
            <span>Aide</span>
        </a>
    </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import feather from 'feather-icons'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()

onMounted(() => {
    feather.replace()
})
</script>

<style scoped>
</style>