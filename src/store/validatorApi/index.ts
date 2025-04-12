import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'
import { apiValidatorSchema } from '@/utils/validations'

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ApiValidatorRequest = z.infer<typeof apiValidatorSchema>

interface ApiValidatorStore {
  requests: ApiValidatorRequest[]
  addRequest: (request: Omit<ApiValidatorRequest, 'id' | 'createdAt'>) => void
  clearHistory: () => void
}

export const useApiValidatorStore = create<ApiValidatorStore>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request) => 
        set((state) => ({
          requests: [
            {
              ...request,
              id: crypto.randomUUID(),
              createdAt: new Date()
            },
            ...state.requests
          ].slice(0, 50) // Mantém apenas os últimos 50 requests
        })),
      clearHistory: () => set({ requests: [] })
    }),
    {
      name: 'api-validator-storage'
    }
  )
) 