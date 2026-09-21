import { NextFunction, Request, Response } from 'express'
import { ApiErrorResponse } from '../types/response'

const notFoundHandler = (_req: Request, res: Response<ApiErrorResponse>, _next: NextFunction) => {
  return res.status(404).json({
    success: false,
    error: {
      message: 'Request tidak ditemukan.',
      code: 'Not Found',
    },
  })
}

export { notFoundHandler }
