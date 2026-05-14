import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<string | null>(localStorage.getItem('auth_user'))
  const isAuthenticated = ref<boolean>(localStorage.getItem('auth_logged') === 'true')

  const login = (username: string) => {
    user.value = username
    isAuthenticated.value = true

    localStorage.setItem('auth_user', username)
    localStorage.setItem('auth_logged', 'true')
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false

    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_logged')
  }

  return { user, isAuthenticated, login, logout }
})
