<template>
  <main 
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100"
    aria-label="Page de connexion"
  >
    <section class="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8" aria-labelledby="login-title">
      <!-- Titre -->
      <header class="text-center mb-6">
        <h1 id="login-title" class="text-3xl font-extrabold text-gray-900">
          Connexion
        </h1>
        <p class="mt-1 text-sm text-gray-700">
          Accédez à votre tableau de bord en toute sécurité
        </p>
      </header>

      <!-- Formulaire -->
      <form class="space-y-5" aria-describedby="login-description">
        <p id="login-description" class="sr-only">
          Saisissez votre adresse email et votre mot de passe pour vous connecter
        </p>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-800">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="exemple@domaine.com"
            autocomplete="email"
            required
            aria-required="true"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm 
                   focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <!-- Mot de passe avec bouton afficher/masquer -->
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-gray-800">Mot de passe</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
            aria-required="true"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm 
                  focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition pr-10"
          />
          <button
            type="button"
            @click="togglePassword"
            aria-label="Afficher ou masquer le mot de passe"
            class="absolute top-1/2 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>


        <!-- Bouton -->
        <button
          type="submit"
          aria-label="Se connecter à votre compte"
          class="w-full py-2.5 px-4 bg-indigo-700 text-white font-semibold rounded-lg 
                 shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 active:scale-[0.98] transition"
        >
          Se connecter
        </button>
      </form>

      <!-- Lien inscription -->
      <p class="mt-6 text-center text-sm text-gray-700">
        Pas encore de compte ?
        <a 
          href="#"
          aria-label="Créer un compte"
          class="text-indigo-700 underline hover:text-indigo-800 focus:text-indigo-800"
        >
          Créer un compte
        </a>
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
// État pour afficher/masquer le mot de passe
const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
