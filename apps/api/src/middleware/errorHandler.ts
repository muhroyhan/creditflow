// middleware/errorMiddleware.ts
import { Response } from 'express'
import { ApiErrorResponse } from '../types/response.js'
import { ApiError } from '../utils/apiError.js'

const errorHandler = (err: any, res: Response<ApiErrorResponse>): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const code = err instanceof ApiError ? err.code : 'INTERNAL_SERVER_ERROR'
  const message = err.message || 'An unexpected error occurred.'

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}

export { errorHandler }
