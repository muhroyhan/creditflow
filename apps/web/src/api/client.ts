// api/client.ts
import axios, { AxiosResponse } from 'axios'
import { authRequestInterceptor, errorResponseInterceptor } from './interceptors'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://example.com',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Praktik baik untuk membantu backend mendeteksi request AJAX
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

// Attach our isolated interceptor middleware
apiClient.interceptors.request.use(authRequestInterceptor, (err) => Promise.reject(err))
apiClient.interceptors.response.use((res: AxiosResponse) => res, errorResponseInterceptor)
