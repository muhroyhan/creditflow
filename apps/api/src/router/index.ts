import express, { type Response } from 'express'
import { sendSuccess } from '../utils/responseHelper.js'
import { v1Router } from './v1.router.js'
import { Pool } from 'pg'

const router = (opt: { pool: Pool }) => {
  const { pool } = opt
  const router = express.Router()

  router.use('/v1', v1Router({ pool }))
  router.use('/', (_, res: Response) => sendSuccess({ res, message: 'Hello World!' }))

  return router
}

export { router }
