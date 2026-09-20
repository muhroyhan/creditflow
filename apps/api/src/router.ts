import express, { type Response } from 'express'
import { healthRouter } from './modules/health/health.router'
import type { DatabaseClient } from './modules/health/health.service'
import { sendSuccess } from './utils/responseHelper'

type RouterOptions = {
  pool: DatabaseClient
}

const router = ({ pool }: RouterOptions) => {
  const appRouter = express.Router()

  appRouter.get('/', (_, res: Response) => {
    sendSuccess({ res, message: 'Hello World!' })
  })
  appRouter.use('/health', healthRouter({ pool }))

  return appRouter
}

export { router }
