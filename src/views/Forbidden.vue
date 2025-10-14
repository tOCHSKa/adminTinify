<template>
  <PageMeta
    title="403 - Accès refusé | TinifyCloud"
    description="Vous n'avez pas l'autorisation d'accéder à cette page sur TinifyCloud."
  />
    <main class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-red-600">403</h1>
        <p class="mt-4 text-xl text-gray-700">Accès refusé</p>
        <router-link
          to="/"
          class="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Retour à l'accueil
        </router-link>
      </div>
    </main>
  </template>
  <script setup>
import PageMeta from '@/components/shared/PageMeta.vue';
</script>
  