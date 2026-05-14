<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-space-dark p-4 text-white flex justify-between items-center">
      <h1 class="text-portal-green font-bold text-xl">Rick & Morty DB</h1>
      <div class="flex items-center gap-4">
        <span>Welcome, {{ authStore.user }}</span>
        <button @click="onLogout" class="text-sm bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>

    <main class="p-8">
      <!-- Aquí irá nuestra tabla de personajes pronto -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-2xl font-bold mb-4">Characters Explorer</h2>
        <p class="text-gray-500 italic">API data coming soon...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

console.log('DashboardView.authStore', authStore.isAuthenticated)

const onLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
