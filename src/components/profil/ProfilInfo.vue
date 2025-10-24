<template>
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Informations personnelles</h2>
            <button class="text-blue-800 hover:text-blue-900 font-medium">Modifier</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="text-gray-500 text-sm">Nom complet</label>
                <p class="font-medium">{{ adminStore.fullName ? adminStore.fullName : 'Non renseigné' }}</p>
            </div>
            <div>
                <label class="text-gray-500 text-sm">Email</label>
                <p class="font-medium">{{ adminStore.email ? adminStore.email : 'Non renseigné' }}</p>
            </div>
            <div>
                <label class="text-gray-500 text-sm">Téléphone</label>
                <p class="font-medium">{{ adminStore.phoneNumber ? adminStore.phoneNumber : 'Non renseigné' }}</p>
            </div>
            <div>
                <label class="text-gray-500 text-sm">Entreprise</label>
                <p class="font-medium">{{ adminStore.entreprise ? adminStore.entreprise : 'Non renseigné' }}</p>
            </div>
            <div>
                <label class="text-gray-500 text-sm">Adresse</label>
                <p class="font-medium">{{ adminStore.address ? adminStore.address : 'Non renseigné' }}</p>
            </div>
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