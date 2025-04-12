import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'
import { apiValidatorSchema, graphqlValidatorSchema } from '@/utils/validations'

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ApiValidatorRequest = z.infer<typeof apiValidatorSchema>
export type GraphQLValidatorRequest = z.infer<typeof graphqlValidatorSchema>

export type RequestType = 'rest' | 'graphql'

interface ApiValidatorStore {
  requestType: RequestType
  setRequestType: (type: RequestType) => void
  restRequests: ApiValidatorRequest[]
  graphqlRequests: GraphQLValidatorRequest[]
  addRestRequest: (request: Omit<ApiValidatorRequest, 'id' | 'createdAt'>) => void
  addGraphQLRequest: (request: Omit<GraphQLValidatorRequest, 'id' | 'createdAt'>) => void
  clearRestHistory: () => void
  clearGraphQLHistory: () => void
}

export const useApiValidatorStore = create<ApiValidatorStore>()(
  persist(
    (set) => ({
      requestType: 'rest',
      setRequestType: (type) => set({ requestType: type }),
      restRequests: [],
      graphqlRequests: [],
      addRestRequest: (request) => 
        set((state) => ({
          restRequests: [
            {
              ...request,
              id: crypto.randomUUID(),
              createdAt: new Date()
            },
            ...state.restRequests
          ].slice(0, 50) // Mantém apenas os últimos 50 requests
        })),
      addGraphQLRequest: (request) => 
        set((state) => ({
          graphqlRequests: [
            {
              ...request,
              id: crypto.randomUUID(),
              createdAt: new Date()
            },
            ...state.graphqlRequests
          ].slice(0, 50) // Mantém apenas os últimos 50 requests
        })),
      clearRestHistory: () => set({ restRequests: [] }),
      clearGraphQLHistory: () => set({ graphqlRequests: [] })
    }),
    {
      name: 'api-validator-storage'
    }
  )
) 