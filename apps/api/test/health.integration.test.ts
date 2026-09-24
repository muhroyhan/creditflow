import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from '../src/app'
import { Pool } from 'pg'

const createDatabaseClient = () => {
  const pool = new Pool()
  const query = vi.spyOn(pool, 'query')

  return { pool, query }
}
describe('health endpoints', () => {
  it('returns live without checking the database', async () => {
    const { pool, query } = createDatabaseClient()
    const app = createApp({ pool, enableRequestLogging: false })

    const response = await request(app).get('/health/live')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      success: true,
      message: 'live',
    })
    expect(query).not.toHaveBeenCalled()
  })

  it('returns ready when the database check succeeds', async () => {
    const { pool, query } = createDatabaseClient()
    query.mockResolvedValue({ rows: [{ one: 1 }] })
    const app = createApp({ pool, enableRequestLogging: false })

    const response = await request(app).get('/health/ready')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      success: true,
      message: 'ready',
    })
    expect(query).toHaveBeenCalledOnce()
    expect(query).toHaveBeenCalledWith('SELECT 1')
  })

  it('returns 503 when the database check fails', async () => {
    const { pool, query } = createDatabaseClient()
    query.mockRejectedValue(new Error('connection refused'))
    const app = createApp({ pool, enableRequestLogging: false })

    const response = await request(app).get('/health/ready')

    expect(response.status).toBe(503)
    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'Database unavailable',
      },
    })
  })

  it('returns 404 for an unknown endpoint', async () => {
    const { pool } = createDatabaseClient()
    const app = createApp({ pool, enableRequestLogging: false })

    const response = await request(app).get('/does-not-exist')

    expect(response.status).toBe(404)
  })
})
