// src/stores/adminStore.js
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  actions: {
    /** Récupère les infos de l'utilisateur connecté via /me */
    async fetchCurrentUser() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/users/me', {
          method: 'GET',
          credentials: 'include', // envoie les cookies HttpOnly
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Erreur serveur')
        }

        const data = await res.json()
        this.user = data
        this.isAuthenticated = true
      } catch (err) {
        this.user = null
        this.isAuthenticated = false
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.error = null
      // Optionnel : faire un fetch POST /logout côté serveur pour supprimer le cookie HttpOnly
      fetch('http://localhost:3000/users/logout', {
        method: 'POST',
        credentials: 'include', 
      })
    },
  },

  getters: {
    role: (state) => state.user?.role,
    email: (state) => state.user?.email,
    shortEmail: (state) => state.user?.email?.split('@')[0] || 'Invité',
  },
})
