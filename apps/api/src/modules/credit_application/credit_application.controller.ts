import { CreditApplication } from '@/db/schema'
import { CreditApplicationService } from './credit_application.service'
import { Request, Response } from 'express'
import {
  CreateCreditApplicationInput,
  CreditApplicatonCalculateResult,
} from './credit_application.types'
import { RequestGetMethod } from '@/types/request'

export const creditApplicationController = (service: CreditApplicationService) => ({
  findAllCreditApplications: async (req: Request, res: Response) => {
    const data = await service.findAll(req.query as unknown as CreditApplication)
    return res.status(200).json({ data })
  },

  createCreditApplication: async (req: Request, res: Response) => {
    const data = await service.create(req.body)
    return res.status(200).json({ data })
  },

  calculateInstallment: (
    req: RequestGetMethod<CreateCreditApplicationInput>,
    res: Response<{ data: CreditApplicatonCalculateResult }>
  ) => {
    const data = service.calculation(req.query)
    return res.status(200).json({ data })
  },
})
