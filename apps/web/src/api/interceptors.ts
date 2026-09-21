// api/interceptors.ts
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ApiErrorResponse } from './types'

// 1. Request Interceptor: Injects Auth Headers dynamically
export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.Accept = 'application/json'
  }
  return config
}

export const errorResponseInterceptor = async (error: AxiosError<ApiErrorResponse>) => {
  const status = error.response?.status
  if (status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (status === 403) {
    console.error('CSRF token mismatch or Forbidden access')
  }

  return Promise.reject(error)
}
