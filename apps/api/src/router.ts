import express, { type Response } from 'express'
import { sendSuccess } from './utils/responseHelper'
import { Pool } from 'pg'
import { healthRouter } from './modules/health/health.router'

const router = (opt: { pool: Pool }) => {
  const { pool } = opt
  const router = express.Router()

  router.use('/health', healthRouter({ pool }))
  router.get('/', (_, res: Response) => sendSuccess({ res, message: 'Hello World!' }))

  return router
}

export { router }
