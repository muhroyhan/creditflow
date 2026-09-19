import express, { type Express, type Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { errorHandler } from './middleware/errorHandler.js'
import { sendSuccess } from './utils/responseHelper.js'

dotenv.config({
  path: '../../.env',
})

const app: Express = express()
app.use(cors({ credentials: true, origin: process.env.WEB_URL }))

app.use(morgan('combined'))
app.use(compression())

app.get('/', (_, res: Response) => {
  sendSuccess({ res, message: 'Hello World!' })
})
app.get('/live', (_, res: Response) => {
  sendSuccess({ res, message: 'live' })
})
app.get('/ready', (_, res: Response) => {
  sendSuccess({ res, message: 'ready' })
})
app.use(errorHandler)
const port = process.env.API_PORT || 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
