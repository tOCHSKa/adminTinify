<template>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo & description -->
          <div>
            <div class="flex items-center mb-4">
              <i data-feather="cloud" class="text-blue-400 w-8 h-8 mr-2"></i>
              <span class="text-xl font-bold">TinifyCloud</span>
            </div>
            <p class="text-gray-400 mb-4">La solution ultime pour compresser vos images et vidéos en ligne.</p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white" aria-label="Twitter">
                <i data-feather="twitter"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white" aria-label="Facebook">
                <i data-feather="facebook"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white" aria-label="Instagram">
                <i data-feather="instagram"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <i data-feather="linkedin"></i>
              </a>
            </div>
          </div>
  
          <!-- Produit -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Produit</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">Fonctionnalités</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Tarifs</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">API</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Documentation</a></li>
            </ul>
          </div>
  
          <!-- Entreprise -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Entreprise</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">À propos</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Carrières</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          <!-- Légal -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Légal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">Confidentialité</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">CGU</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Mentions légales</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
  
        <!-- Copyright -->
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2023 TinifyCloud. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import feather from "feather-icons";
  
  onMounted(() => {
    feather.replace(); // initialisation des icônes Feather
  });
  </script>
  
  <style scoped>
  /* Pas de changement nécessaire pour Tailwind, tout reste identique */
  </style>
  