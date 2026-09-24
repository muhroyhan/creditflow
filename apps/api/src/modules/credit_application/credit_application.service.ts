import { type CreditApplication, creditApplication } from '@/db/schema'
import { ApiError } from '@/utils/ApiError'
import { calculateCreditInstallment } from '@/utils/calculateCreditInstallment'
import { and, eq, inArray, SQL } from 'drizzle-orm'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { CreateCreditApplicationInput } from './credit_application.types'

interface ICreditApplicationService {
  getQueryParams(where: CreditApplication): SQL[]
  findOne(id: string): Promise<CreditApplication | null>
  findAll(where: CreditApplication): Promise<CreditApplication[] | null>
  create(data: CreditApplication | unknown): Promise<string>
  update(data: CreditApplication): Promise<CreditApplication>
  delete(id: string): void
  approval(data: CreditApplication): void
}

class CreditApplicationService implements ICreditApplicationService {
  // Encapsulation: The database dependency is private to this class
  private dbClient: NodePgDatabase

  constructor(pool: Pool) {
    this.dbClient = drizzle({ client: pool })
  }

  getQueryParams(where: CreditApplication) {
    const conditions: SQL[] = []

    // 2. Iterate or conditionally push filters into the array
    if (where.id) {
      conditions.push(eq(creditApplication.id, where.id))
    }

    if (where.status) {
      conditions.push(eq(creditApplication.status, where.status))
    }
    return conditions
  }

  async findOne(id: string | string[]): Promise<CreditApplication | null> {
    const items = await this.dbClient
      .select()
      .from(creditApplication)
      .where(
        typeof id === 'string' ? eq(creditApplication.id, id) : inArray(creditApplication.id, id)
      )
      .limit(1)
    if (!items.length) return null
    return items[0]
  }
  async findAll(where: CreditApplication): Promise<CreditApplication[] | null> {
    const filters = this.getQueryParams(where)
    const items = await this.dbClient
      .select()
      .from(creditApplication)
      .where(!filters.length ? undefined : and(...filters))
    if (!items.length) return null
    return items
  }
  async create(data: CreateCreditApplicationInput): Promise<string> {
    try {
      const calculated = calculateCreditInstallment(data.principalAmount, 12, data.tenorMonth)
      const insert = {
        principalAmount: data.principalAmount.toString(),
        tenorMonth: data.tenorMonth,
        annualInterestRate: '12',
        interestAmount: calculated.interest.toString(),
        totalRepaymentAmount: calculated.totalLoan.toString(),
        monthlyInstallmentAmount: calculated.monthlyInstallment.toString(),
        status: 'draft' as const,
        createdBy: 'new',
        updatedBy: 'new',
      }
      const newData = await this.dbClient.insert(creditApplication).values(insert).returning()
      return newData[0].id
    } catch (error) {
      throw new ApiError(String(error), 400, 'Bad Request')
    }
  }
  async update(data: CreditApplication): Promise<CreditApplication> {
    try {
      const newData = await this.dbClient.update(creditApplication).set(data).returning()
      return newData[0]
    } catch (error) {
      throw new ApiError(String(error), 400, 'Bad Request')
    }
  }
  async delete(id: string) {
    try {
      await this.dbClient.delete(creditApplication).where(eq(creditApplication.id, id))
    } catch (error) {
      throw new ApiError(String(error), 400, 'Bad Request')
    }
  }
  async approval(data: CreditApplication) {
    try {
      await this.dbClient.update(creditApplication).set(data)
    } catch (error) {
      throw new ApiError(String(error), 400, 'Bad Request')
    }
  }
  calculation(data: CreateCreditApplicationInput) {
    return calculateCreditInstallment(Number(data.principalAmount), 12, Number(data.tenorMonth))
  }
}

export { CreditApplicationService }
