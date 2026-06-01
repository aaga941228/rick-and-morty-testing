import { nextTick } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn<(path: string) => void>(),
    replace: vi.fn<(path: string) => void>(),
  }),
  useRoute: () => ({}),
}))

describe('LoginView.vue - Integration Test', () => {
  let wrapper: VueWrapper<unknown>
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    wrapper = mount(LoginView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
        stubs: ['router-link', 'router-view'],
      },
    })

    authStore = useAuthStore()

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly', () => {
    expect(wrapper.text()).toContain('Welcome Back!')
  })

  it('should show validation error when username is too short', async () => {
    const usernameInput = wrapper.find('#username')

    await usernameInput.setValue('abc')

    await wrapper.find('form').trigger('submit')

    vi.advanceTimersByTime(1000)

    await nextTick()

    expect(wrapper.text()).toContain('Minimum 8 characters')
  })

  it('should show validation error when password is too short', async () => {
    const passwordInput = wrapper.find('#password')

    await passwordInput.setValue('abc')

    await wrapper.find('form').trigger('submit')

    vi.advanceTimersByTime(1000)

    await nextTick()

    expect(wrapper.text()).toContain('Minimum 5 characters')
  })

  it('should show error message when credentials are incorrects', async () => {
    await wrapper.find('#username').setValue('user_valido_pero_incorrecto')
    await wrapper.find('#password').setValue('admin')

    await wrapper.find('form').trigger('submit')

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(authStore.login).not.toHaveBeenCalled()

    expect(wrapper.text()).toContain('Wrong credentials')
  })

  it('should call authStore.login and show no errors with correct credentials', async () => {
    await wrapper.find('#username').setValue('admin123')
    await wrapper.find('#password').setValue('admin')

    await wrapper.find('form').trigger('submit')

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(authStore.login).toHaveBeenCalledWith('admin123')

    expect(wrapper.text()).not.toContain('Wrong credentials')
  })
})
