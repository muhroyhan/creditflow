const calculateCreditInstallment = (
  principalLoan: number,
  annualInterestRate: number,
  tenor: number
) => {
  const montlyInterestRate = annualInterestRate / 12
  const monthlyInterest = (principalLoan * montlyInterestRate) / 100
  const interest = monthlyInterest * tenor
  const totalLoan = principalLoan + interest
  const monthlyInstallment = totalLoan / tenor
  return { totalLoan, monthlyInstallment, interest }
}

export { calculateCreditInstallment }
