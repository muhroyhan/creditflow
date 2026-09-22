export type CreateCreditApplicationInput = {
  principalAmount: number
  tenorMonth: number
}
export type CreditApplicatonCalculateResult = {
  monthlyInstallment: number
  totalLoan: number
}
