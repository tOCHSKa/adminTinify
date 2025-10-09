<template>
    <transition-group
      name="toast-fade"
      tag="div"
      class="fixed bottom-6 right-6 flex flex-col gap-3 z-50"
    >
      <div
        v-for="(toast, index) in toasts"
        :key="toast.id"
        class="relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-2xl ring-1 ring-gray-200 text-blue-800 overflow-hidden bg-gray-100"
      >
        <span class="font-medium">{{ toast.message }}</span>
        <button
          @click="removeToast(index)"
          class="ml-3 text-blue-800 hover:text-blue-800 transition"
          title="Fermer"
        >
          ✕
        </button>
  
        <!-- Barre de progression (gauche → droite) -->
        <div
          class="absolute bottom-0 left-0 h-1 bg-blue-800"
          :style="{ width: toast.progress + '%', transition: 'width 0.1s linear' }"
        ></div>
      </div>
    </transition-group>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  const toasts = ref([])
  
  /**
   * Affiche un toast avec barre de progression fluide
   * @param {string} message - texte du toast
   * @param {'success'|'error'|'info'} type - type du toast
   * @param {number} duration - durée avant disparition (ms)
   */
  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    const toast = reactive({
      id,
      message,
      type,
      progress: 0
    })
  
    toasts.value.push(toast)
  
    // Animation fluide
    const startTime = performance.now()
  
    const animate = (time) => {
      const elapsed = time - startTime
      toast.progress = Math.min((elapsed / duration) * 100, 100)
      if (toast.progress < 100) {
        requestAnimationFrame(animate)
      } else {
        removeToastById(id)
      }
    }
  
    requestAnimationFrame(animate)
  }
  
  /**
   * Supprime un toast par index
   */
  const removeToast = (index) => {
    toasts.value.splice(index, 1)
  }
  
  /**
   * Supprime un toast par id
   */
  const removeToastById = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) removeToast(index)
  }
  
  defineExpose({ showToast })
  </script>
  
  <style scoped>
  .toast-fade-enter-active,
  .toast-fade-leave-active {
    transition: all 0.3s ease;
  }
  .toast-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  .toast-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  