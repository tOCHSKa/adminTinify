// src/stores/adminStore.js
import { defineStore } from 'pinia'
import { logout as apiLogout } from '../services/api.js'

const baseURL = process.env.VUE_APP_API_URL

export const useAdminStore = defineStore('admin', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    firstName: null,
    lastName: null,
    createdAt: null,
    entreprise: null,
    phoneNumber: null,
    address: null,
    compressionCount: null,
    plan: null,
    UUID: null,
  }),

  actions: {
    /** 
     * Récupère les infos de l'utilisateur connecté via /me
     * Silencieux : aucune erreur n'est throwée pour ne pas polluer la console
     */
    async fetchCurrentUser() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${baseURL}/users/me`, {
          method: 'GET',
          credentials: 'include',
        })
        // Si le token/cookie est invalide ou user non connecté
        if (!res.ok) {
          this.user = null
          this.isAuthenticated = false
          return
        }

        const data = await res.json()
        this.user = data
        this.isAuthenticated = true
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.createdAt = data.createdAt
        this.entreprise = data.entreprise
        this.phoneNumber = data.phoneNumber
        this.address = data.address
        this.compressionCount = data.compressionCount
        this.plan = data.plan
        this.UUID = data.UUID
      } catch (err) {
        // Silencieux : on reset juste l'état
        this.user = null
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    /**
     * Déconnexion de l'utilisateur
     */
    async logout() {
      this.loading = true
      this.error = null
      try {
        await apiLogout()
      } catch (err) {
        this.error = err.message || 'Erreur lors de la déconnexion'
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.loading = false
      }
    },
  },

  getters: {
    role: (state) => state.user?.role,
    email: (state) => state.user?.email,
    shortEmail: (state) => state.user?.email?.split('@')[0] || 'Invité',
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    createdAt: (state) => state.user?.createdAt.split('T')[0],
    entreprise: (state) => state.user?.entreprise,
    phoneNumber: (state) => state.user?.phoneNumber,
    address: (state) => state.user?.address,
    compressionCount: (state) => state.user?.compressionCount,
    plan: (state) => state.user?.plan,
    UUID: (state) => state.user?.UUID,
    id: (state) => state.user?._id,
    },
})
