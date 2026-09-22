export type CreditApplication = {
  id: string
  principalAmount: number
  tenorMonth: number
  annualInterestRate: number
  interestAmount: number
  totalRepaymentAmount: number
  monthlyInstallmentAmount: number
  status: 'draft' | 'pending' | 'rejected' | 'approved'
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}
export type CreateCreditApplicationInput = {
  principalAmount: number
  tenorMonth: number
}

export type UpdateCreditApplicationInput = Partial<CreateCreditApplicationInput>

export type CreditApplicatonCalculateResult = {
  monthlyInstallment: number
  totalLoan: number
}
