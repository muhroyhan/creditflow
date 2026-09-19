export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T | null
}

export interface ApiErrorResponse {
  success: false
  error: {
    message: string
    code: string
    stack?: string // Hanya muncul saat development
  }
}
