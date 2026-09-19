import express, { type Express, type Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config({
  path: '../../.env',
})

const app: Express = express()
app.use(cors())

app.use(morgan('combined'))

app.get('/', (_, res: Response) => {
  res.send('Hello World!')
})
app.get('/live', (_, res: Response) => {
  res.send('live')
})
app.get('/ready', (_, res: Response) => {
  res.send('ready')
})

app.listen(process.env.API_PORT, () => {
  console.log(`Example app listening on port ${process.env.API_PORT}`)
})
