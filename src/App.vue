<template>
  <router-view />
  <Toast ref="toastRef" />
</template>

<script setup>
import Toast from '@/components/Toast.vue'
import { ref, onMounted, provide } from 'vue'

const toastRef = ref(null)

// Fournir le toast **après que le composant soit monté**
onMounted(() => {
  provide('toast', toastRef.value)
})
</script>
