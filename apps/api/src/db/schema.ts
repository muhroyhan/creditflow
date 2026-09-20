import { pgSchema, uuid, varchar } from 'drizzle-orm/pg-core'

const schema = pgSchema('creditflow')

export const lenderTable = schema.table('lender', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar().notNull(),
  status: varchar().notNull(),
})
