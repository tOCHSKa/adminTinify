<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Informations personnelles</h2>

      <!-- Boutons d'action -->
      <template v-if="!isEditing">
        <button
          class="text-blue-800 hover:text-blue-900 font-medium"
          @click="toggleEditMode"
        >
          Modifier
        </button>
      </template>
      <template v-else>
        <div class="flex space-x-2">
          <button
            class="text-white bg-blue-600 font-medium px-4 border-2 border-blue-600 rounded hover:border-blue-600 hover:bg-white hover:text-blue-600"
            @click="handleSave"
          >
            Enregistrer
          </button>
          <button
            class="text-red-800 font-medium border-2 border-red-800 rounded hover:border-red-800 hover:text-white hover:bg-red-800 px-4"
            @click="handleCancel"
          >
            Annuler
          </button>
        </div>
      </template>
    </div>

    <!-- Contenu principal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nom complet -->
      <div>
        <label class="text-gray-500 text-sm">Nom complet</label>
        <p v-if="!isEditing" class="font-medium">
          {{ adminStore.fullName || 'Non renseigné' }}
        </p>
        <input
          v-else
          type="text"
          v-model="userInfo.fullName"
          class="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="text-gray-500 text-sm">Email</label>
        <p class="font-medium">
          {{ adminStore.email || 'Non renseigné' }}
        </p>
      </div>

      <!-- Téléphone -->
      <div>
        <label class="text-gray-500 text-sm">Téléphone</label>
        <p v-if="!isEditing" class="font-medium">
          {{ adminStore.phoneNumber || 'Non renseigné' }}
        </p>
        <input
          v-else
          type="tel"
          v-model="userInfo.phoneNumber"
          class="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <!-- Entreprise -->
      <div>
        <label class="text-gray-500 text-sm">Entreprise</label>
        <p v-if="!isEditing" class="font-medium">
          {{ adminStore.entreprise || 'Non renseigné' }}
        </p>
        <input
          v-else
          type="text"
          v-model="userInfo.entreprise"
          class="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <!-- Adresse -->
      <div class="md:col-span-2">
        <label class="text-gray-500 text-sm">Adresse</label>
        <p v-if="!isEditing" class="font-medium">
          {{ adminStore.address || 'Non renseigné' }}
        </p>
        <input
          v-else
          type="text"
          v-model="userInfo.address"
          class="border border-gray-300 rounded w-full p-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import feather from 'feather-icons'
import { useAdminStore } from '@/stores/adminStore'
import { updateUserInfo } from '@/services/api.js'
import { inject } from 'vue'
import Toast from '@/components/Toast.vue'

const toastRef = inject('toast')       // Référence au composant Toast global
const adminStore = useAdminStore()


onMounted(async () => {
  if (!adminStore.user) {
    await adminStore.fetchCurrentUser()
  }
})

console.log('✅ adminStore.user =', adminStore.user.UUID)

const isEditing = ref(false)
const userInfo = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  entreprise: '',
  address: ''
})

// Active / désactive le mode édition
const toggleEditMode = () => {
  if (!isEditing.value) {
    // Pré-remplit le formulaire avec les infos du store
    userInfo.value = {
      fullName: adminStore.fullName || '',
      email: adminStore.email || '',
      phoneNumber: adminStore.phoneNumber || '',
      entreprise: adminStore.entreprise || '',
      address: adminStore.address || '',
    }
  }

  isEditing.value = !isEditing.value
}


const handleSave = async () => {
  if (!adminStore.user?.UUID) {
    console.error("Utilisateur non encore chargé.")
    return
  }

  try {
    await updateUserInfo(userInfo.value)
    isEditing.value = false
    adminStore.fetchCurrentUser()
    toastRef.value?.showToast('✅ Informations mises à jour avec succès', 'success')
  } catch (error) {
    console.error(error)
    toastRef.value?.showToast('❌ Erreur lors de la mise à jour des informations', 'error')
  }
}

// Annule les changements
const handleCancel = () => {
  isEditing.value = false
  userInfo.value = { ...adminStore.$state } // reset
}

onMounted(() => {
  feather.replace()
})


</script>

<style scoped>
/* Optionnel : transition douce entre lecture / édition */
input {
  transition: all 0.2s ease-in-out;
}
</style>
