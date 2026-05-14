import type { APIResponse } from '@/types/Character'

export const characterService = {
  async getAllCharacters(page: number): Promise<APIResponse> {
    const protocol = 'https://'
    const url = `${protocol}rickandmortyapi.com/api/character/?page=${page}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch characters from the Citadel')
    }

    return response.json()
  },
}
