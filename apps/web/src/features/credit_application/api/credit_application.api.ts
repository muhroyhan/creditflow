import { apiClient } from '../../../api/client'
import type { ApiResponse } from '../../../api/types'
import type {
  CreditApplication,
  CreateCreditApplicationInput,
  UpdateCreditApplicationInput,
  CreditApplicatonCalculateResult,
} from './credit_application.types'

const basePath = '/credit-application'

const requireData = <T>(response: ApiResponse<T>): T => {
  if (response.data === null) {
    throw new Error(response.message)
  }

  return response.data
}

export const creditApplicationApi = {
  async create(input: CreateCreditApplicationInput): Promise<{ id: number }> {
    const { data } = await apiClient.post<ApiResponse<{ id: number }>>(basePath, input)

    return requireData(data)
  },

  async getById(id?: string, signal?: AbortSignal): Promise<CreditApplication> {
    const { data } = await apiClient.get<ApiResponse<CreditApplication>>(`${basePath}/${id}`, {
      signal,
    })

    return requireData(data)
  },

  async list(signal?: AbortSignal): Promise<CreditApplication[]> {
    const { data } = await apiClient.get<ApiResponse<CreditApplication[]>>(basePath, {
      signal,
    })

    return requireData(data)
  },

  async update(id: string, input: UpdateCreditApplicationInput): Promise<CreditApplication> {
    const { data } = await apiClient.patch<ApiResponse<CreditApplication>>(
      `${basePath}/${id}`,
      input,
    )

    return requireData(data)
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`${basePath}/${id}`)
  },

  async calculate(input: CreateCreditApplicationInput): Promise<CreditApplicatonCalculateResult> {
    const { data } = await apiClient.get<ApiResponse<CreditApplicatonCalculateResult>>(
      `${basePath}/calculate`,
      { params: input },
    )

    return requireData(data)
  },
}
