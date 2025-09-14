import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: null,
    isAuthenticated: false,
    email: null,
    role: null,
  }),
  actions: {
    initializeStore() {
      const token = Cookies.get('token')
      if (token) {
        this.setUser({ token })
        this.isAuthenticated = true
      }
    },
    setUser(userData) {
      const decoded = jwtDecode(userData.token)
      this.email = decoded.email
      this.role = decoded.role
      this.token = userData.token
      this.isAuthenticated = true
      Cookies.set('token', userData.token, { expires: 7 }) // expire dans 7 jours
    },
    logout() {
      this.token = null
      this.isAuthenticated = false
      this.email = null
      Cookies.remove('token')
    },
  },
  getters: {
    getToken: (state) => state.token,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getEmail: (state) => state.email,
    getRole: (state) => state.role,
  },
})
