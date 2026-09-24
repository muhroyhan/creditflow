import { mutationOptions } from '@tanstack/react-query'
import { apiClient } from './client'
import { ApiResponse } from './types'

const requireData = <T>(response: ApiResponse<T>): T => {
  if (response.data === null) {
    throw new Error(response.message)
  }
  return response.data
}

export const mutations = {
  create: (endpoint: string, mutationKey: string[]) =>
    mutationOptions({
      mutationKey,
      mutationFn: async <T, V>(input: T) => {
        const { data } = await apiClient.post<ApiResponse<V>>(endpoint, input)
        return requireData(data)
      },
    }),
}
