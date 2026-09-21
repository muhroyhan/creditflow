type DatabaseClient = {
  query: (query: string) => Promise<unknown>
}

type HealthServiceOptions = {
  pool: DatabaseClient
}

const healthService = ({ pool }: HealthServiceOptions) => ({
  databaseCheck: async (): Promise<void> => {
    await pool.query('SELECT 1')
  },
})

export { healthService }
export type { DatabaseClient }
