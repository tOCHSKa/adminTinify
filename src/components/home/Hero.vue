<template>
      <!-- Hero Section -->
      <section class="hero-gradient py-20 md:py-32">
        <div class="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-12 md:mb-0">
                <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">Compressez vos fichiers en quelques secondes</h1>
                <p class="text-xl text-gray-600 mb-8">Réduisez la taille de vos images et vidéos sans perdre en qualité. Gagnez de l'espace et accélérez vos sites web.</p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="#" class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium text-center transition duration-200 hover:scale-105">Commencer maintenant</a>
                    <a href="javascript:void(0)" 
                    @click="scrollToSection"  class="border border-blue-800 text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium text-center transition duration-200 hover:scale-105">Voir comment ça marche</a>
                </div>
                <div class="mt-8 flex items-center space-x-4">
                    <div class="flex -space-x-2">
                        <img src="https://randomuser.me/api/portraits/women/12.jpg" class="w-10 h-10 rounded-full border-2 border-white" alt="User">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-10 h-10 rounded-full border-2 border-white" alt="User">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-10 h-10 rounded-full border-2 border-white" alt="User">
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Rejoint par <span class="font-medium">5000+</span> utilisateurs</p>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="bg-white p-4 rounded-xl shadow-lg">
                    <div class="bg-gray-100 rounded-lg overflow-hidden">
                        <img src="http://static.photos/technology/1024x576/42" alt="Interface TinifyCloud" class="w-full h-auto">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const scrollToSection = () => {
  const el = document.getElementById('howitwork');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
</style>