import { Pool } from 'pg'

const healthService = (pool: Pool) => ({
  databaseCheck: async (): Promise<void> => {
    await pool.query('SELECT 1')
  },
})

export { healthService }
export type { Pool }
