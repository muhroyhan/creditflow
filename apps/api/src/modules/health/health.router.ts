import express, { type Response } from 'express'
import { sendSuccess } from '../../utils/responseHelper.js'
import { ApiError } from '../../utils/ApiError'
import { DrizzleQueryError } from 'drizzle-orm/errors'
import { Pool } from 'pg'
import { healthService } from './health.service.js'

const healthRouter = (opt: { pool: Pool }) => {
  const { pool } = opt
  const router = express.Router()

  router.get('/live', (_, res: Response) => {
    sendSuccess({ res, message: 'live' })
  })
  router.get('/ready', async (_req, res: Response) => {
    try {
      await healthService({ pool }).databaseCheck()
      sendSuccess({ res, message: 'ready' })
    } catch (err) {
      if (err instanceof DrizzleQueryError) throw new ApiError(err.message, 503)
      else throw new ApiError(String(err), 503)
    }
  })

  return router
}

export { healthRouter }
