import compression from 'compression'
import cors from 'cors'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import { notFoundHandler } from './middleware/notFoundHandler'
import type { Pool } from './modules/health/health.service'
import { router } from './router'

type CreateAppOptions = {
  pool: Pool
  enableRequestLogging?: boolean
}

const createApp = ({ pool, enableRequestLogging = true }: CreateAppOptions): Express => {
  const app = express()

  app.use(cors({ credentials: true, origin: process.env.WEB_URL }))
  app.use(express.json())
  app.use(compression())

  if (enableRequestLogging) {
    app.use(morgan('combined'))
  }

  app.use(router({ pool }))
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

export { createApp }
