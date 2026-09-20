import { NextFunction, Request, Response } from 'express'

const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json({
    status: 404,
    title: 'Not Found',
    detail: 'Request tidak ditemukan.',
  })
}

export { notFoundHandler }
