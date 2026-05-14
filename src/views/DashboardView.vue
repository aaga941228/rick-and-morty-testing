<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <nav
      class="bg-space-dark border-b border-gray-800 p-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-80"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          class="text-portal-green font-black text-2xl tracking-wider drop-shadow-[0_0_8px_rgba(151,206,76,0.5)]"
        >
          WUBBA LUBBA DUB DUB
        </h1>
        <div
          class="flex items-center gap-4 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700"
        >
          <span class="text-sm font-medium text-science-cyan">
            Traveler: <span class="text-white font-bold">{{ authStore.user ?? 'Guest' }}</span>
          </span>
          <button
            @click="onLogout"
            class="flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all border border-rose-500/30"
          >
            <LogOut class="w-3.5 h-3.5" />
            Exit Portal
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto p-6 md:p-8">
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 class="w-12 h-12 text-portal-green animate-spin" />
        <p class="text-sm text-gray-400 animate-pulse tracking-widest">
          LOADING MULTIVERSE DATA...
        </p>
      </div>

      <div
        v-else-if="errorMessage"
        class="bg-rose-500/10 border-2 border-rose-500 text-rose-200 p-4 rounded-xl flex items-center gap-3 max-w-xl mx-auto my-12"
      >
        <AlertCircle class="w-6 h-6 text-rose-500 shrink-0" />
        <div>
          <h4 class="font-bold text-sm text-rose-400">Dimension Error</h4>
          <p class="text-xs mt-0.5">{{ errorMessage }}</p>
        </div>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="character in characters"
            :key="character.id"
            class="bg-space-dark border border-gray-800 rounded-2xl overflow-hidden hover:border-portal-green/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
          >
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="character.image"
                :alt="character.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                class="absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border backdrop-blur-md"
                :class="{
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30':
                    character.status === 'Alive',
                  'bg-rose-500/20 text-rose-400 border-rose-500/30': character.status === 'Dead',
                  'bg-gray-500/20 text-gray-400 border-gray-500/30': character.status === 'unknown',
                }"
              >
                {{ character.status }}
              </span>
            </div>

            <div class="p-4 flex flex-col gap-1">
              <h3
                class="font-black text-lg text-white group-hover:text-portal-green transition-colors truncate"
              >
                {{ character.name }}
              </h3>
              <div class="flex flex-col text-xs text-gray-400 gap-0.5">
                <p><span class="text-gray-500">Species:</span> {{ character.species }}</p>
                <p><span class="text-gray-500">Gender:</span> {{ character.gender }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, Loader2, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { characterService } from '@/services/characterService'
import type { Character } from '@/types/Character'
import type { ErrorResponse } from '@/types/ErrorResponse'

const router = useRouter()
const authStore = useAuthStore()

const characters = ref<Character[]>([])
const loading = ref(false)
const errorMessage = ref('')
const currentPage = ref(1)

const onLogout = () => {
  authStore.logout()
  router.push('/')
}

const loadCharacters = async (page = 1) => {
  loading.value = true
  errorMessage.value = ''

  try {
    const data = await characterService.getAllCharacters(page)

    characters.value = data.results
    currentPage.value = page
  } catch (err: unknown) {
    errorMessage.value = (err as ErrorResponse).message || 'Error loading data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCharacters()
})
</script>
