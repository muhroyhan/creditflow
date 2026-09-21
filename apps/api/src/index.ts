import dotenv from 'dotenv'
import { Pool } from 'pg'
import { createApp } from './app'

dotenv.config({
  path: '../../.env',
})

const databaseUrl =
  `postgresql://${process.env.DATABASE_USER}` +
  `:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}` +
  `/${process.env.DATABASE_NAME}`

const port = Number(process.env.API_PORT ?? 3000)

if (!Number.isInteger(port) || port <= 0) {
  throw new Error('API_PORT must be a valid port number')
}

const pool = new Pool({ connectionString: databaseUrl })
const app = createApp({ pool })

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
