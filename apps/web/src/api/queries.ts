// features/users/api/queries.ts
import { queryOptions } from '@tanstack/react-query'
import { apiClient } from './client'
import { publicKeys } from './keys'
import { ApiResponse } from './types'

export const getApiLiveStatus = () =>
  queryOptions({
    queryKey: publicKeys.live,
    queryFn: async ({ signal }) => {
      const { data } = await apiClient.get<ApiResponse<string>>('/live', { signal })
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes global freshness for this endpoint
  })

export const getApiReadyStatus = () =>
  queryOptions({
    queryKey: publicKeys.ready,
    queryFn: async ({ signal }) => {
      const { data } = await apiClient.get<ApiResponse<string>>(`/ready`, { signal })
      return data
    },
  })
