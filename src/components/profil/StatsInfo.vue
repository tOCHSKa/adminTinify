<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-bold mb-6">Statistiques d'utilisation</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-800 font-bold text-2xl mb-2">{{ adminStore.compressionCount }}</div>
                <div class="text-gray-600">Fichiers compressés</div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-800 font-bold text-2xl mb-2">3.2 GB</div>
                <div class="text-gray-600">Espace gagné</div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-800 font-bold text-2xl mb-2">{{ adminStore.plan }}</div>
                <div class="text-gray-600">Abonnement actuel</div>
            </div>
        </div>

        <h3 class="font-semibold mb-4">Activité récente</h3>
        <div class="space-y-4">
            <div class="flex items-start p-3 border border-gray-100 rounded-lg">
                <div class="bg-blue-100 p-2 rounded-lg mr-4">
                    <i data-feather="image" class="text-blue-800 w-5 h-5"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <span class="font-medium">photo_produit.jpg</span>
                        <span class="text-sm text-gray-500">Aujourd'hui, 14:32</span>
                    </div>
                    <div class="text-sm text-gray-600">Réduction de 4.2 MB à 1.1 MB (74%)</div>
                </div>
            </div>
            <div class="flex items-start p-3 border border-gray-100 rounded-lg">
                <div class="bg-blue-100 p-2 rounded-lg mr-4">
                    <i data-feather="video" class="text-blue-800 w-5 h-5"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <span class="font-medium">presentation.mp4</span>
                        <span class="text-sm text-gray-500">Hier, 09:15</span>
                    </div>
                    <div class="text-sm text-gray-600">Réduction de 82 MB à 45 MB (45%)</div>
                </div>
            </div>
            <div class="flex items-start p-3 border border-gray-100 rounded-lg">
                <div class="bg-blue-100 p-2 rounded-lg mr-4">
                    <i data-feather="image" class="text-blue-800 w-5 h-5"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <span class="font-medium">banner_web.png</span>
                        <span class="text-sm text-gray-500">20 juin 2023</span>
                    </div>
                    <div class="text-sm text-gray-600">Réduction de 1.8 MB à 540 KB (70%)</div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <a href="index.html" class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium inline-block transition duration-200">Compresser un nouveau fichier</a>
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