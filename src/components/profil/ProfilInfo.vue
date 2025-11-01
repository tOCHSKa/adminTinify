<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Informations personnelles</h2>

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
            class="text-white bg-blue-600 font-medium px-4 border-2 border-blue-600 rounded hover:border-blue-600 hover:bg-white hover:text-blue-600 disabled:opacity-50"
            :disabled="loading || hasErrors"
            @click="handleSave"
          >
            <span v-if="!loading">Enregistrer</span>
            <span v-else>⏳ Sauvegarde...</span>
          </button>
          <button
            class="text-red-800 font-medium border-2 border-red-800 rounded hover:border-red-800 hover:text-white hover:bg-red-800 px-4"
            :disabled="loading"
            @click="handleCancel"
          >
            Annuler
          </button>
        </div>
      </template>
    </div>

    <!-- Formulaire -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nom complet -->
      <div>
        <label class="text-gray-500 text-sm">Nom complet</label>
        <p v-if="!isEditing" class="font-medium">{{ adminStore.fullName || 'Non renseigné' }}</p>
        <div v-else>
          <input
            type="text"
            v-model="userInfo.fullName"
            class="border border-gray-300 rounded w-full p-2"
            @input="validateField('fullName')"
          />
          <p v-if="errors.fullName" class="text-red-600 text-sm mt-1">{{ errors.fullName }}</p>
        </div>
      </div>

      <!-- Email (lecture seule) -->
      <div>
        <label class="text-gray-500 text-sm">Email</label>
        <p class="font-medium">{{ adminStore.email || 'Non renseigné' }}</p>
      </div>

      <!-- Téléphone -->
      <div>
        <label class="text-gray-500 text-sm">Téléphone</label>
        <p v-if="!isEditing" class="font-medium">{{ adminStore.phoneNumber || 'Non renseigné' }}</p>
        <div v-else>
          <input
            type="tel"
            v-model="userInfo.phoneNumber"
            class="border border-gray-300 rounded w-full p-2"
            @input="validateField('phoneNumber')"
          />
          <p v-if="errors.phoneNumber" class="text-red-600 text-sm mt-1">{{ errors.phoneNumber }}</p>
        </div>
      </div>

      <!-- Entreprise -->
      <div>
        <label class="text-gray-500 text-sm">Entreprise</label>
        <p v-if="!isEditing" class="font-medium">{{ adminStore.entreprise || 'Non renseigné' }}</p>
        <div v-else>
          <input
            type="text"
            v-model="userInfo.entreprise"
            class="border border-gray-300 rounded w-full p-2"
          />
        </div>
      </div>

      <!-- Adresse -->
      <div class="md:col-span-2">
        <label class="text-gray-500 text-sm">Adresse</label>
        <p v-if="!isEditing" class="font-medium">{{ adminStore.address || 'Non renseigné' }}</p>
        <div v-else>
          <input
            type="text"
            v-model="userInfo.address"
            class="border border-gray-300 rounded w-full p-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, inject } from 'vue'
import feather from 'feather-icons'
import { useAdminStore } from '@/stores/adminStore'
import { updateUserInfo } from '@/services/api.js'

const adminStore = useAdminStore()
const toastRef = inject('toast')

const isEditing = ref(false)
const loading = ref(false)

const userInfo = reactive({
  fullName: '',
  phoneNumber: '',
  entreprise: '',
  address: ''
})

const errors = reactive({
  fullName: '',
  phoneNumber: ''
})

// Validation inline
const validateField = (field) => {
  switch (field) {
    case 'fullName':
      errors.fullName = userInfo.fullName.trim() ? '' : 'Le nom complet est requis'
      break
    case 'phoneNumber':
      errors.phoneNumber = userInfo.phoneNumber.trim() && /^\+?\d{6,15}$/.test(userInfo.phoneNumber)
        ? ''
        : 'Numéro de téléphone invalide'
      break
  }
}

const hasErrors = computed(() => Object.values(errors).some(e => e))

const fillUserInfo = () => {
  userInfo.fullName = adminStore.fullName || ''
  userInfo.phoneNumber = adminStore.phoneNumber || ''
  userInfo.entreprise = adminStore.entreprise || ''
  userInfo.address = adminStore.address || ''

  // Reset errors
  errors.fullName = ''
  errors.phoneNumber = ''
}

const toggleEditMode = () => {
  if (!isEditing.value) fillUserInfo()
  isEditing.value = !isEditing.value
}

const hasChanges = () => {
  return (
    userInfo.fullName !== (adminStore.fullName || '') ||
    userInfo.phoneNumber !== (adminStore.phoneNumber || '') ||
    userInfo.entreprise !== (adminStore.entreprise || '') ||
    userInfo.address !== (adminStore.address || '')
  )
}

const handleSave = async () => {
  validateField('fullName')
  validateField('phoneNumber')
  if (hasErrors.value) return

  if (!hasChanges()) {
    // Pas de changement → fermer le mode édition et toast info
    isEditing.value = false
    toastRef.value?.showToast('ℹ️ Aucun changement détecté', 'info')
    return
  }

  loading.value = true
  try {
    const updated = await updateUserInfo(userInfo)
    // Mise à jour locale
    adminStore.fullName = updated.user.firstName + ' ' + updated.user.lastName
    adminStore.phoneNumber = updated.user.phoneNumber
    adminStore.entreprise = updated.user.entreprise
    adminStore.address = updated.user.address

    isEditing.value = false
    toastRef.value?.showToast('✅ Informations mises à jour avec succès', 'success')
    adminStore.fetchCurrentUser()
  } catch (err) {
    console.error(err)
    toastRef.value?.showToast('❌ Erreur lors de la mise à jour', 'error')
  } finally {
    loading.value = false
  }
}



const handleCancel = () => {
  fillUserInfo()
  isEditing.value = false
}

onMounted(async () => {
  if (!adminStore.user) await adminStore.fetchCurrentUser()
  feather.replace()
})
</script>

<style scoped>
input {
  transition: all 0.2s ease-in-out;
}
</style>
