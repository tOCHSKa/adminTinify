<script setup>
import { useHead } from '@vueuse/head'
import { defineProps, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// Mise à jour du <head> dès que les props changent
watch(
  () => [props.title, props.description],
  () => {
    useHead({
      title: props.title,
      meta: [
        { name: 'description', content: props.description }
      ]
    })
  },
  { immediate: true }
)
</script>
