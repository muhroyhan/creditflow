import { CreditApplication } from '@/db/schema'
import { CreditApplicationService } from './credit_application.service'
import { Request, Response } from 'express'
import {
  CreateCreditApplicationInput,
  CreditApplicatonCalculateResult,
} from './credit_application.types'
import { RequestGetMethod, RequestPostPatchMethod } from '@/types/request'

export const creditApplicationController = (service: CreditApplicationService) => ({
  findAllCreditApplications: async (req: Request, res: Response) => {
    const data = await service.findAll(req.query as unknown as CreditApplication)
    return res.status(200).json({ data })
  },

  findOneCreditApplication: async (req: Request, res: Response) => {
    const data = await service.findOne(req.params.id)
    return res.status(200).json({ data })
  },

  createCreditApplication: async (
    req: RequestPostPatchMethod<CreateCreditApplicationInput>,
    res: Response
  ) => {
    const id = await service.create(req.body)
    return res.status(200).json({ data: { id } })
  },

  calculateInstallment: (
    req: RequestGetMethod<CreateCreditApplicationInput>,
    res: Response<{ data: CreditApplicatonCalculateResult }>
  ) => {
    console.log('test')
    const data = service.calculation(req.query)
    return res.status(200).json({ data })
  },
})
