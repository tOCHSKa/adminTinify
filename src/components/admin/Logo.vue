<template>
    <div class="bg-white rounded-2xl p-4 flex flex-col items-center justify-center">
        <i data-feather="cloud" class="text-blue-800 w-8 h-8 mb-1"></i>
        <span class="text-xl font-bold text-blue-800">TinifyCloud</span>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import feather from 'feather-icons'

onMounted(() => {
  feather.replace()
})
</script>

<style scoped>
</style>