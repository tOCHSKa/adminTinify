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
            v-model="email"
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
            v-model="password"
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
            <span v-if="showPassword"><Icon icon="iconamoon:eye-off-thin" width="24" height="24" /></span>
            <span v-else><Icon icon="iconamoon:eye-light" width="24" height="24" /></span>
          </button>
        </div>


        <!-- Bouton -->
        <button
          :disabled="!email || !password"
          @click.prevent="handleSubmit"
          aria-label="Se connecter à votre compte"
          class="cursor-pointer w-full py-2.5 px-4 bg-indigo-700 text-white font-semibold rounded-lg 
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
      <p v-if="errorMessage" class="text-center mt-3 text-sm text-red-600" role="alert">
        {{ errorMessage }}
      </p>
    </section>
  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'
import { login } from '../services/api.js'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)

const admin = useAdminStore()
const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

const handleSubmit = async () => {
  errorMessage.value = ''

  // Vérifications front
  if (!email.value || !password.value) {
    errorMessage.value = 'Tous les champs sont requis.'
    return
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = 'Email invalide.'
    return
  }

  try {
    console.log(email.value, password.value)
    const data = await login(email.value, password.value)
    console.log('Connecté !', data)

        // Mettre à jour le store
    admin.setUser({ token: data.token })

    // Redirection après connexion
    router.push('/test')
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Erreur serveur'
  }
}

</script>

