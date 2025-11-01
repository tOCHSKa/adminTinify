<template>
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-800 font-bold text-2xl mb-2">{{ numberUnit }} {{ unit }}</div>
                <div class="text-gray-600">{{ title }}</div>
            </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    numberUnit: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
</style>