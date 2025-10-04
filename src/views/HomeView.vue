<template>
  <div>
    <PageMeta
    title="TinifyCloud - Compressez vos fichiers rapidement"
    description="Réduisez la taille de vos images et vidéos sans perdre en qualité, pour un site plus rapide."
    />
    <Navigation />
    <Hero id="hero"/>
    <HowItWork id="howitwork"/>
    <Testimonials />
    <CallToAction />
    <Faq id="faq"/>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '@/components/home/Navigation.vue';
import Hero from '@/components/home/Hero.vue';
import HowItWork from '@/components/home/HowItWork.vue';
import Testimonials from '@/components/home/Testimonials.vue';
import CallToAction from '@/components/home/CallToAction.vue';
import Faq from '@/components/home/Faq.vue';
import Footer from '@/components/Footer.vue';
import PageMeta from '@/components/shared/PageMeta.vue';
</script>

<style scoped>
</style>