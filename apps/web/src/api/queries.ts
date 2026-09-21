// features/users/api/queries.ts
import { queryOptions } from '@tanstack/react-query'
import { apiClient } from './client'
import { publicKeys } from './keys'
import { ApiResponse } from './types'

export const getApiLiveStatus = () =>
  queryOptions({
    queryKey: publicKeys.live,
    queryFn: async ({ signal }) => {
      const { data } = await apiClient.get<ApiResponse<string>>('/health/live', { signal })
      return data
    },
  })

export const getApiReadyStatus = () =>
  queryOptions({
    queryKey: publicKeys.ready,
    queryFn: async ({ signal }) => {
      const { data } = await apiClient.get<ApiResponse<string>>(`/health/ready`, { signal })
      return data
    },
  })
