<template>
  <div class="min-h-screen flex items-center justify-center bg-space-dark">
    <div class="p-5 bg-white rounded-xl shadow-2xl login-card">
      <p class="text-lg font-bold text-portal-green">Welcome Back!</p>
      <form class="flex flex-col gap-5" @submit.prevent="onLogin">
        <div class="flex flex-col">
          <label for="username">User name</label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="username"
              placeholder="User"
              class="pl-10 w-full border border-space-dark rounded p-2"
              v-model="username"
            />
          </div>

          <span v-if="userNameMessage" class="text-red-500 text-sm mt-1 ml-1 font-medium">
            {{ userNameMessage }}
          </span>
        </div>

        <div class="flex flex-col">
          <label for="password">Password</label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              type="password"
              placeholder="******"
              class="pl-10 w-full border border-space-dark rounded p-2"
              v-model="password"
            />
          </div>

          <span v-if="passwordMessage" class="text-red-500 text-sm mt-1 ml-1 font-medium">
            {{ passwordMessage }}
          </span>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="flex items-center justify-center gap-2 rounded border border-space-dark bg-space-dark px-5 py-2 text-white transition-all hover:bg-space-light disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200"
            :disabled="disabled"
          >
            <Loader2 v-if="submited" class="h-4 w-4 animate-spin" />
            <span>{{ submited ? 'Authorizing...' : 'Login' }}</span>
          </button>
        </div>

        <span v-if="showError" class="text-red-500 text-sm mt-1 ml-1 font-medium">
          Wrong credentials
        </span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { User, Lock, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const submited = ref(false)
const showError = ref(false)

const userNameMessage = ref('')
const passwordMessage = ref('')

const usernameSchema = z.string().min(8, 'Minimum 8 characters')
const passwordSchema = z.string().min(5, 'Minimum 5 characters')

const disabled = computed(
  () => submited.value || username.value.trim().length === 0 || password.value.trim().length === 0,
)

const validate = () => {
  const emailResult = usernameSchema.safeParse(username.value)
  const passwordResult = passwordSchema.safeParse(password.value)

  if (!emailResult.success) {
    userNameMessage.value = emailResult.error!.flatten()!.formErrors[0] as string
  } else {
    userNameMessage.value = ''
  }

  if (!passwordResult.success) {
    passwordMessage.value = passwordResult.error!.flatten()!.formErrors[0] as string
  } else {
    passwordMessage.value = ''
  }

  return emailResult.success && passwordResult.success
}

const onLogin = () => {
  submited.value = true
  showError.value = false

  userNameMessage.value = ''
  passwordMessage.value = ''

  setTimeout(() => {
    const isValid = validate()

    if (isValid) {
      if (username.value.trim() === 'admin123' && password.value.trim() === 'admin') {
        authStore.login(username.value.trim())
        router.push('/dashboard')
      } else {
        showError.value = true
      }
    }

    submited.value = false
  }, 1000)
}
</script>

<style scoped>
.login-card {
  min-width: 320px;
}
</style>
