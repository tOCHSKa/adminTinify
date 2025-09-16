// src/stores/userStore.js
import { defineStore } from 'pinia'

const baseURL = 'http://localhost:3000'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => (id) => state.users.find(u => u._id === id),
    admins: (state) => state.users.filter(u => u.role === 'admin'),
    regularUsers: (state) => state.users.filter(u => u.role === 'user'),
  },

  actions: {
    /** Récupère tous les utilisateurs */
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${baseURL}/users`, {
          credentials: 'include',           // ✅ envoie automatiquement le cookie
        })
        if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur')
        this.users = await res.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    /** Supprime un utilisateur */
    async deleteUser(id) {
      try {
        const res = await fetch(`${baseURL}/users/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur')
        this.users = this.users.filter(u => u._id !== id)
      } catch (err) {
        this.error = err.message
      }
    },

    /** Met à jour le rôle d’un utilisateur */
    async updateUserRole(id, role) {
      try {
        const res = await fetch(`${baseURL}/users/${id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role }),
        })
        if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur')
        const updated = await res.json()
        const idx = this.users.findIndex(u => u._id === id)
        if (idx !== -1) this.users[idx] = updated
      } catch (err) {
        this.error = err.message
      }
    },
  },
})
