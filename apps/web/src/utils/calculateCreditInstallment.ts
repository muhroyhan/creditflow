const calculateCreditInstallment = (params: { loan: number; tenor: number }) => {
  const { loan, tenor } = params
  const annualInterestRate = 12
  const montlyInterestRate = annualInterestRate / 12
  const monthlyInterest = (loan * montlyInterestRate) / 100
  const interest = monthlyInterest * tenor
  const totalLoan = loan + interest
  const monthlyInstallment = totalLoan / tenor
  return { totalLoan, monthlyInstallment }
}

export { calculateCreditInstallment }
