import { mutationOptions } from '@tanstack/react-query'
import { creditApplicationApi } from './credit_application.api'
import { creditApplicationKeys } from './credit_application.keys'

export const creditApplicationMutations = {
  create: () =>
    mutationOptions({
      mutationKey: creditApplicationKeys.all,
      mutationFn: creditApplicationApi.create,
    }),

  update: () =>
    mutationOptions({
      mutationKey: ['credit-applications', 'update'],
      mutationFn: ({
        id,
        input,
      }: {
        id: string
        input: Parameters<typeof creditApplicationApi.update>[1]
      }) => creditApplicationApi.update(id, input),
    }),

  remove: () =>
    mutationOptions({
      mutationKey: ['credit-applications', 'delete'],
      mutationFn: creditApplicationApi.remove,
    }),
}
