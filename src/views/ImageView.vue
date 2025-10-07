<template>
  <div>
    <PageMeta
    title="TinifyCloud - Compressez vos fichiers rapidement"
    description="Réduisez la taille de vos images et vidéos sans perdre en qualité, pour un site plus rapide."
    />
    <Navigation />
    <Dropzone />
    <Features />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '@/components/home/Navigation.vue';
import Footer from '@/components/Footer.vue';
import PageMeta from '@/components/shared/PageMeta.vue';
import Dropzone from '@/components/image/dropzone.vue';
import Features from '@/components/image/features.vue';
</script>

<style scoped>
</style>