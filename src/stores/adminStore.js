// src/stores/adminStore.js
import { defineStore } from 'pinia'

const baseURL = process.env.VUE_APP_API_URL

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
        const res = await fetch(`${baseURL}/users/me`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          if (res.status === 401) {
            // Utilisateur non connecté, on ignore silencieusement
            this.user = null
            this.isAuthenticated = false
          } else {
            const err = await res.json()
            this.error = err.error || 'Erreur serveur'
            this.user = null
            this.isAuthenticated = false
          }
          return
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
      fetch(`${baseURL}/users/logout`, {
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
