<template>
  <PageMeta
    title="Créer un compte | TinifyCloud"
    description="Créez votre compte pour compresser, gérer et télécharger vos fichiers en toute simplicité."
  />
  <Navbar />

  <main
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100"
    aria-label="Page d’inscription"
  >
    <section
      class="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
      aria-labelledby="register-title"
    >
      <!-- Titre -->
      <header class="text-center mb-6">
        <h1 id="register-title" class="text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h1>
        <p class="mt-1 text-sm text-gray-700">
          Accédez à votre tableau de bord en toute sécurité
        </p>
      </header>

      <!-- Formulaire -->
      <form class="space-y-5" @submit.prevent="handleRegister" aria-describedby="register-description">
        <p id="register-description" class="sr-only">
          Saisissez votre adresse email et votre mot de passe pour créer votre compte
        </p>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-800">Adresse e-mail</label>
          <input
            v-model.trim="email"
            id="email"
            type="email"
            placeholder="exemple@domaine.com"
            autocomplete="email"
            required
            aria-required="true"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm 
                   focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <!-- Mot de passe -->
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-gray-800">Mot de passe</label>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="••••••••"
            autocomplete="new-password"
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
            <Icon :icon="showPassword ? 'iconamoon:eye-off-thin' : 'iconamoon:eye-light'" width="24" height="24" />
          </button>
        </div>

        <!-- Barre de sécurité -->
        <div v-if="password" class="mt-2">
          <div class="w-full h-2 rounded-full overflow-hidden bg-gray-200">
            <div
              class="h-full transition-all duration-300"
              :class="passwordStrengthClass"
              :style="{ width: passwordStrength + '%' }"
            ></div>
          </div>
          <p class="text-xs mt-1 text-gray-600">
            Force du mot de passe :
            <span :class="passwordStrengthLabelClass">{{ passwordStrengthLabel }}</span>
          </p>
        </div>

        <!-- Indicateurs dynamiques -->
        <ul class="mt-3 text-sm space-y-1">
          <li :class="ruleClass(passwordLengthValid)">
            <span>{{ passwordLengthValid ? '✅' : '❌' }}</span>
            <span class="ml-1">Au moins 8 caractères</span>
          </li>
          <li :class="ruleClass(passwordUppercaseValid)">
            <span>{{ passwordUppercaseValid ? '✅' : '❌' }}</span>
            <span class="ml-1">Une majuscule</span>
          </li>
          <li :class="ruleClass(passwordSpecialValid)">
            <span>{{ passwordSpecialValid ? '✅' : '❌' }}</span>
            <span class="ml-1">Un caractère spécial</span>
          </li>
          <li :class="ruleClass(!passwordHasSpace)">
            <span>{{ !passwordHasSpace ? '✅' : '❌' }}</span>
            <span class="ml-1">Aucun espace</span>
          </li>
        </ul>

        <!-- Confirmation mot de passe -->
        <div class="relative">
          <label for="confirmedPassword" class="block text-sm font-medium text-gray-800">Confirmer le mot de passe</label>
          <input
            v-model="confirmedPassword"
            :type="showConfirmedPassword ? 'text' : 'password'"
            id="confirmedPassword"
            placeholder="••••••••"
            autocomplete="new-password"
            required
            aria-required="true"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm 
                   focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition pr-10"
          />
          <button
            type="button"
            @click="toggleConfirmedPassword"
            aria-label="Afficher ou masquer le mot de passe"
            class="absolute top-1/2 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Icon :icon="showConfirmedPassword ? 'iconamoon:eye-off-thin' : 'iconamoon:eye-light'" width="24" height="24" />
          </button>
        </div>

        <!-- Bouton -->
        <button
          type="submit"
          :disabled="loading"
          aria-label="Créer un compte"
          class="cursor-pointer w-full py-2.5 px-4 bg-indigo-700 text-white font-semibold rounded-lg 
                 shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Création...</span>
          <span v-else>Créer un compte</span>
        </button>
      </form>

      <!-- Message d’erreur -->
      <p v-if="errorMessage" class="text-center mt-3 text-sm text-red-600" role="alert">
        {{ errorMessage }}
      </p>

      <!-- Lien vers login -->
      <p class="mt-6 text-center text-sm text-gray-700">
        Déjà un compte ?
        <RouterLink
          to="/login"
          aria-label="Se connecter"
          class="text-indigo-700 underline hover:text-indigo-800 focus:text-indigo-800"
        >
          Se connecter
        </RouterLink>
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import PageMeta from '@/components/shared/PageMeta.vue'
import Navbar from '@/components/home/Navigation.vue'
import { register } from '@/services/api.js'

const toastRef = inject('toast')
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmedPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmedPassword = ref(false)

// --- Règles dynamiques ---
const passwordLengthValid = computed(() => password.value.length >= 8)
const passwordUppercaseValid = computed(() => /[A-Z]/.test(password.value))
const passwordSpecialValid = computed(() => /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password.value))
const passwordHasSpace = computed(() => password.value.includes(' '))

// --- Calcul de la "force" ---
const passwordScore = computed(() => {
  let score = 0
  if (passwordLengthValid.value) score++
  if (passwordUppercaseValid.value) score++
  if (passwordSpecialValid.value) score++
  if (!passwordHasSpace.value) score++
  return score
})

const passwordStrength = computed(() => (passwordScore.value / 4) * 100)

const passwordStrengthLabel = computed(() => {
  if (passwordStrength.value < 50) return 'Faible'
  if (passwordStrength.value < 75) return 'Moyen'
  return 'Fort'
})

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value < 50) return 'bg-red-500'
  if (passwordStrength.value < 75) return 'bg-yellow-400'
  return 'bg-green-500'
})

const passwordStrengthLabelClass = computed(() => {
  if (passwordStrength.value < 50) return 'text-red-600 font-medium'
  if (passwordStrength.value < 75) return 'text-yellow-600 font-medium'
  return 'text-green-600 font-semibold'
})

const ruleClass = (valid) => valid ? 'text-green-600' : 'text-gray-500'

// --- Fonctions ---
const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirmedPassword = () => (showConfirmedPassword.value = !showConfirmedPassword.value)
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateForm = () => {
  if (!validateEmail(email.value)) return 'Email invalide.'
  if (!passwordLengthValid.value) return 'Le mot de passe doit contenir au moins 8 caractères.'
  if (passwordHasSpace.value) return 'Le mot de passe ne peut pas contenir d’espace.'
  if (!passwordUppercaseValid.value) return 'Le mot de passe doit contenir au moins une majuscule.'
  if (!passwordSpecialValid.value) return 'Le mot de passe doit contenir au moins un caractère spécial.'
  if (password.value !== confirmedPassword.value) return 'Les mots de passe ne correspondent pas.'
  return null
}

const handleRegister = async () => {
  if (loading.value) return
  errorMessage.value = ''
  const validationError = validateForm()

  if (validationError) {
    errorMessage.value = validationError
    if (validationError.includes('Email')) document.getElementById('email')?.focus()
    else if (validationError.includes('correspondent')) document.getElementById('confirmedPassword')?.focus()
    else document.getElementById('password')?.focus()
    return
  }

  loading.value = true
  try {
    await register(email.value.trim().toLowerCase(), password.value)
    router.push('/login')
    toastRef?.value?.showToast('✅ Inscription réussie')
  } catch (err) {
    errorMessage.value = err.message || 'Erreur lors de l’inscription.'
    toastRef?.value?.showToast('❌ ' + errorMessage.value)
  } finally {
    loading.value = false
  }
}
</script>
