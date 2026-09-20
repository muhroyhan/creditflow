import express, { type Response } from 'express'
import { ApiError } from '../../utils/ApiError'
import { sendSuccess } from '../../utils/responseHelper.js'
import { healthService, type DatabaseClient } from './health.service.js'

type HealthRouterOptions = {
  pool: DatabaseClient
}

const healthRouter = ({ pool }: HealthRouterOptions) => {
  const health = healthService({ pool })
  const router = express.Router()

  router.get('/live', (_, res: Response) => {
    sendSuccess({ res, message: 'live' })
  })

  router.get('/ready', async (_req, res: Response) => {
    try {
      await health.databaseCheck()
      sendSuccess({ res, message: 'ready' })
    } catch {
      throw new ApiError('Database unavailable', 503, 'DATABASE_UNAVAILABLE')
    }
  })

  return router
}

export { healthRouter }
