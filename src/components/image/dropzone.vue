<template>
    <Toast ref="toast" />
    <div class="container mx-auto px-6 py-12">
      <!-- Card principale -->
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold mb-6">Compresser vos images</h1>
        <p class="text-lg text-gray-600 mb-8">
          Réduisez la taille de vos images sans perte de qualité visible.
          Formats supportés : JPG, PNG, GIF, WEBP
        </p>
  
        <!-- Zone de drop -->
        <div
          id="dropzone"
          class="dropzone rounded-lg p-12 text-center mb-8"
          :class="{ active: dropzoneActive }"
          @dragover.prevent="handleDragOver"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop"
        >
          <div class="max-w-md mx-auto">
            <i data-feather="upload-cloud" class="w-12 h-12 text-blue-500 mx-auto mb-4"></i>
            <h3 class="text-lg font-medium mb-2">Glissez-déposez vos images ici</h3>
            <p class="text-gray-500 mb-4">Taille maximale : 10 Mo / 20 fichiers max</p>
  
            <label
              for="file-upload"
              class="cursor-pointer bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium inline-block transition duration-200"
            >
              Ou sélectionnez des fichiers
              <input
                id="file-upload"
                type="file"
                class="hidden"
                multiple
                accept="image/*"
                @change="handleFileUpload"
              />
            </label>
          </div>
        </div>
  
        <!-- Prévisualisation -->
        <div id="preview-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 justify-items-center">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="relative flex justify-center"
          >
            <img
              :src="file.preview"
              alt="aperçu"
              class="w-24 h-24 object-cover rounded-lg shadow-sm transition-transform duration-200 hover:scale-105 cursor-pointer"
              @click="openLightbox(file.preview)"
            />
            <button
              @click="removeFile(index)"
              class="absolute top-1 left-8 bg-white/80 hover:bg-blue-600 hover:text-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow transition duration-200 opacity-100"
              title="Supprimer"
            >
              ✕
            </button>
          </div>
        </div>
  
        <!-- Barre de progression -->
        <div v-if="isCompressing" class="mb-4">
          <p class="text-gray-600 mb-2">Compression en cours...</p>
          <div class="w-full bg-gray-200 h-4 rounded">
            <div
              class="bg-blue-800 h-4 rounded transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div class="text-gray-600">
            <span>{{ fileCount }}</span> fichier(s) sélectionné(s)
          </div>
          <div class="flex space-x-4">
            <button
              id="reset-btn"
              @click="resetFiles"
              class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
            >
              Tout effacer
            </button>
            <button
              id="compress-btn"
              @click="compressFiles"
              class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              :class="{ 'opacity-50 cursor-not-allowed': files.length === 0 || isCompressing }"
              :disabled="files.length === 0 || isCompressing"
            >
              Compresser maintenant
            </button>
          </div>
        </div>
  
        <!-- Téléchargement ZIP -->
        <div
          v-if="zipUrl"
          class="mt-[2rem] p-8 bg-green-50 rounded-lg border border-green-200 text-center"
        >
          <p class="mb-2 font-medium text-green-700">Votre fichier ZIP est prêt !</p>
          <a
            :href="zipUrl"
            download="images_compresses.zip"
            class="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-200"
            @click="downloadZip"
          >
            Télécharger le ZIP
          </a>
        </div>
      </div>
    </div>
  
    <!-- Lightbox -->
    <transition name="lightbox">
      <div
        v-if="lightboxImage"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        @click.self="closeLightbox"
      >
        <img
          :src="lightboxImage"
          alt="image agrandie"
          class="max-h-[90%] max-w-[90%] rounded-lg shadow-lg transform transition-transform duration-300"
        />
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 bg-white/80 hover:bg-blue-600 hover:text-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow transition duration-200 text-xl"
          title="Fermer"
        >
          ✕
        </button>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import feather from 'feather-icons'
  import axios from 'axios'
  import Toast from '@/components/Toast.vue'
  
  const toast = ref(null)
  const files = ref([])
  const fileCount = ref(0)
  const dropzoneActive = ref(false)
  const MAX_SIZE = 10 * 1024 * 1024
  const MAX_FILES = 20
  const isCompressing = ref(false)
  const progress = ref(0)
  const zipUrl = ref('')
  const lightboxImage = ref(null)
  
  onMounted(() => feather.replace())
  
  const handleDragOver = () => dropzoneActive.value = true
  const handleDragLeave = () => dropzoneActive.value = false
  const handleDrop = (event) => {
    dropzoneActive.value = false
    const droppedFiles = Array.from(event.dataTransfer.files)
    addFiles(droppedFiles)
  }
  const handleFileUpload = (event) => addFiles(Array.from(event.target.files))
  
  /**
   * Ajout de fichiers avec validation
   */
  const addFiles = (newFiles) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const errors = []
  
    if (files.value.length + newFiles.length > MAX_FILES) {
      toast.value.showToast(`⚠️ Vous ne pouvez pas dépasser ${MAX_FILES} fichiers.`)
      return
    }
  
    newFiles.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`❌ ${file.name} : format non supporté`)
        return
      }
  
      if (file.size > MAX_SIZE) {
        errors.push(`⚠️ ${file.name} : dépasse 10 Mo`)
        return
      }
  
      const duplicate = files.value.some(f => f.file.name === file.name && f.file.size === file.size)
      if (duplicate) {
        errors.push(`⚠️ ${file.name} : déjà ajouté`)
        return
      }
  
      const reader = new FileReader()
      reader.onload = (e) => {
        files.value.push({ file, preview: e.target.result })
        fileCount.value = files.value.length
      }
      reader.readAsDataURL(file)
    })
  
    if (errors.length > 0) {
      errors.forEach(msg => toast.value.showToast(msg))
    } else {
      toast.value.showToast('✅ Fichiers ajoutés avec succès')
    }
  }
  
  /**
   * Suppression d’un fichier
   */
  const removeFile = (index) => {
    files.value.splice(index, 1)
    fileCount.value = files.value.length
    toast.value.showToast('🗑️ Fichier supprimé')
  }
  
  /**
   * Réinitialisation
   */
  const resetFiles = () => {
    files.value = []
    fileCount.value = 0
    zipUrl.value = ''
    document.getElementById('file-upload').value = ''
    toast.value.showToast('🔄 Liste réinitialisée')
  }
  
  /**
   * Compression via backend
   */
  const compressFiles = async () => {
    if (files.value.length === 0) return
  
    isCompressing.value = true
    progress.value = 0
  
    try {
      const formData = new FormData()
      files.value.forEach(f => formData.append('file', f.file))
  
      const response = await axios.post('http://localhost:3000/uploads/image', formData, {
        withCredentials: true,
        responseType: 'blob',
        timeout: 30000,
        onUploadProgress: (event) => {
          progress.value = Math.round((event.loaded * 100) / event.total)
        }
      })
  
      const url = window.URL.createObjectURL(response.data)
      zipUrl.value = url
      toast.value.showToast('✅ Compression terminée, ZIP prêt à télécharger !')
  
      files.value = []
      fileCount.value = 0
      isCompressing.value = false
    } catch (err) {
      console.error(err)
      isCompressing.value = false
      toast.value.showToast('❌ Erreur lors de la compression')
    }
  }
  
  /**
   * Téléchargement du ZIP
   */
  const downloadZip = () => {
    if (!zipUrl.value) return
    toast.value.showToast('💾 ZIP téléchargé')
    setTimeout(() => {
      window.URL.revokeObjectURL(zipUrl.value)
      zipUrl.value = ''
    }, 200)
  }
  
  /**
   * Lightbox
   */
  const openLightbox = (src) => lightboxImage.value = src
  const closeLightbox = () => lightboxImage.value = null
  </script>
  
  <style scoped>
  .dropzone {
    border: 2px dashed #93c5fd;
    transition: all 0.3s ease;
  }
  .dropzone.active {
    border-color: #3b82f6;
    background-color: #eff6ff;
  }
  .lightbox-enter-active,
  .lightbox-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .lightbox-enter-from,
  .lightbox-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  .lightbox-enter-to,
  .lightbox-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  </style>
  