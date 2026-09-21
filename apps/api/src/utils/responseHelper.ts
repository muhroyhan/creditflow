import { type Response } from 'express'

const sendSuccess = (json: { res: Response; data?: any; message: string; statusCode?: number }) => {
  return json.res.status(json.statusCode || 200).json({
    success: true,
    message: json.message,
    data: json.data,
  })
}

export { sendSuccess }
