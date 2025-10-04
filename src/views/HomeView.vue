<template>
  <div>
    <Navigation />
    <Hero />
    <HowItWork id="howitwork"/>
    <Testimonials />
    <CallToAction />
    <Faq />
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
</script>

<style scoped>
</style>