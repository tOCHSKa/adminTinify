<template>
    <div class="bg-white rounded-2xl p-4">
      <h3>{{ title }}</h3>
      <p class="text-4xl font-semibold">{{ value }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: [String, Number]
  })
  </script>
  
  <style scoped>
  </style>
  