import express from 'express'
import { healthRouter } from '../modules/health/health.router.js'
import { Pool } from 'pg'

enum ApiPathEnum {
  health = '/health',
}

const v1Router = (opt: { pool: Pool }) => {
  const { pool } = opt
  const router = express.Router()

  router.use(ApiPathEnum.health, healthRouter({ pool }))

  return router
}

export { v1Router }
