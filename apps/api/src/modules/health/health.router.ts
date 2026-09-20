import express, { type Response } from 'express'
import { sendSuccess } from '../../utils/responseHelper.js'
import { drizzle } from 'drizzle-orm/node-postgres'
import { ApiError } from '../../utils/apiError.js'
import { DrizzleQueryError } from 'drizzle-orm/errors'
import { Pool } from 'pg'

const healthRouter = (opt: { pool: Pool }) => {
  const { pool } = opt
  const router = express.Router()

  router.get('/', (_, res: Response) => {
    sendSuccess({ res, message: 'Hello World!' })
  })
  router.get('/live', (_, res: Response) => {
    sendSuccess({ res, message: 'live' })
  })
  router.get('/ready', async (_req, res: Response) => {
    try {
      const db = drizzle({ client: pool })
      await db.execute('select 1')
      sendSuccess({ res, message: 'ready' })
    } catch (err) {
      if (err instanceof DrizzleQueryError) throw new ApiError(err.message, 503)
    }
  })

  return router
}

export { healthRouter }
