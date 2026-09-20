import express, { type Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { errorHandler } from './middleware/errorHandler'
import { router } from './router'
import { Pool } from 'pg'
import { notFoundHandler } from './middleware/notFoundHandler'

dotenv.config({
  path: '../../.env',
})
const DATABASE_URL =
  `postgresql://${process.env.DATABASE_USER}` +
  `:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}` +
  `/${process.env.DATABASE_NAME}`
const pool = new Pool({ connectionString: DATABASE_URL })

const app: Express = express()
app.use(cors({ credentials: true, origin: process.env.WEB_URL }))
app.use(morgan('combined'))
app.use(compression())
app.use(router({ pool }))
app.use(errorHandler)
app.use(notFoundHandler)

const port = Number(process.env.API_PORT ?? 3000)
if (!Number.isInteger(port) || port <= 0) {
  throw new Error('API_PORT must be a valid port number')
}
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
