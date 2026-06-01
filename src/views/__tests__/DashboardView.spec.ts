import { nextTick } from 'vue'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import DashboardView from '@/views/DashboardView.vue'
import { characterService } from '@/services/characterService'
import type { APIResponse } from '@/types/Character'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn<(path: string) => void>(),
    replace: vi.fn<(path: string) => void>(),
  }),
  useRoute: () => ({}),
}))

vi.mock('@/services/characterService', () => ({
  characterService: {
    getAllCharacters: vi.fn<(page?: number) => Promise<APIResponse>>(),
  },
}))

describe('DashboardView.vue - Integration Test', () => {
  let wrapper: VueWrapper<unknown>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show loading state initially', async () => {
    vi.mocked(characterService.getAllCharacters).mockReturnValue(new Promise(() => {}))

    wrapper = mount(DashboardView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['router-link', 'router-view'],
      },
    })

    await nextTick()

    expect(wrapper.text()).toContain('LOADING MULTIVERSE DATA...')
  })

  it('should render character list when API fetch is successful', async () => {
    const mockResponse: APIResponse = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick de Pruebas',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          image: 'https://example.com',
          episode: [],
          url: '',
          created: '',
        },
        {
          id: 2,
          name: 'Morty de Pruebas',
          status: 'Dead',
          species: 'Human',
          type: '',
          gender: 'Male',
          image: 'https://example.com',
          episode: [],
          url: '',
          created: '',
        },
      ],
    }

    vi.mocked(characterService.getAllCharacters).mockResolvedValue(mockResponse)

    wrapper = mount(DashboardView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['router-link', 'router-view'],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Rick de Pruebas')
    expect(wrapper.text()).toContain('Morty de Pruebas')

    expect(wrapper.text()).not.toContain('LOADING MULTIVERSE DATA...')
  })

  it('should show error message when API fetch fails', async () => {
    const networkError = new Error('Failed to fetch characters from the Citadel')

    vi.mocked(characterService.getAllCharacters).mockRejectedValue(networkError)

    wrapper = mount(DashboardView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['router-link', 'router-view'],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Dimension Error')
    expect(wrapper.text()).toContain('Failed to fetch characters from the Citadel')

    expect(wrapper.text()).not.toContain('LOADING MULTIVERSE DATA...')
  })
})
