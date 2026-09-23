import express from 'express'
import { creditApplicationController } from './credit_application.controller.js'
import { CreditApplicationService } from './credit_application.service.js'
import { Pool } from 'pg'

const creditApplicationRouter = (pool: Pool) => {
  const router = express.Router()

  const service = new CreditApplicationService(pool)
  const controller = creditApplicationController(service)

  router.get('/', controller.findAllCreditApplications)
  router.get('/calculate', controller.calculateInstallment)
  router.get('/:id', controller.findOneCreditApplication)
  router.post('/', controller.createCreditApplication)

  return router
}

export { creditApplicationRouter }
