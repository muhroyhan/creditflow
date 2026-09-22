import express, { type Response } from 'express'
import { healthRouter } from './modules/health/health.router'
import type { Pool } from './modules/health/health.service'
import { sendSuccess } from './utils/responseHelper'
import { creditApplicationRouter } from './modules/credit_application/credit_application.router'

type RouterOptions = {
  pool: Pool
}

const router = ({ pool }: RouterOptions) => {
  const appRouter = express.Router()

  appRouter.get('/', (_, res: Response) => {
    sendSuccess({ res, message: 'Hello World!' })
  })
  appRouter.use('/health', healthRouter(pool))
  appRouter.use('/credit-application', creditApplicationRouter(pool))

  return appRouter
}

export { router }
