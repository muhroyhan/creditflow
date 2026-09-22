import { integer, numeric, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const creditApplicationStatus = pgEnum('credit_application_status', [
  'draft',
  'pending',
  'rejected',
  'approved',
])

export const creditApplication = pgTable('credit_application', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  principalAmount: numeric('principal_amount').notNull(),
  tenorMonth: integer('tenor_month').notNull(),
  annualInterestRate: numeric('annual_interest_rate').notNull(),
  interestAmount: numeric('interest_amount').notNull(),
  totalRepaymentAmount: numeric('total_repayment_amount').notNull(),
  monthlyInstallmentAmount: numeric('monthly_installment_amount').notNull(),
  status: creditApplicationStatus('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: varchar('created_by'),
  updatedAt: timestamp('created_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar('updated_by'),
})

export type CreditApplication = typeof creditApplication.$inferSelect
