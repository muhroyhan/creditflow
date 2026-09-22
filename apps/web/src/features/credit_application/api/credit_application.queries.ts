import { queryOptions } from '@tanstack/react-query'
import { creditApplicationApi } from './credit_application.api'
import { creditApplicationKeys } from './credit_application.keys'
import { CreateCreditApplicationInput } from './credit_application.types'

export const creditApplicationQueries = {
  list: () =>
    queryOptions({
      queryKey: creditApplicationKeys.list(),
      queryFn: ({ signal }) => creditApplicationApi.list(signal),
    }),
  detail: (id?: string) =>
    queryOptions({
      queryKey: creditApplicationKeys.detail(id),
      queryFn: ({ signal }) => creditApplicationApi.getById(id, signal),
      enabled: Boolean(id),
    }),
  calculate: (input: CreateCreditApplicationInput) =>
    queryOptions({
      queryKey: [...creditApplicationKeys.calculate(), input],
      queryFn: () => creditApplicationApi.calculate(input),
      enabled: Boolean(Number(input.principalAmount)),
    }),
}
