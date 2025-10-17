<template>
  <router-view />
  <Toast ref="toastRef" />
</template>

<script setup>
import Toast from '@/components/Toast.vue'
import { ref, provide } from 'vue'

const toastRef = ref(null)

// Fournir le ref lui-même, pas sa valeur
provide('toast', toastRef)
</script>
