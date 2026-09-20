import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const healthService = (opt: { pool: Pool }) => {
  const { pool } = opt
  return {
    databaseCheck: async () => {
      const db = drizzle({ client: pool })
      return await db.execute('select 1')
    },
  }
}

export { healthService }
