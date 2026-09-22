export const creditApplicationKeys = {
  all: ['credit-applications'] as const,

  lists: () => [...creditApplicationKeys.all, 'list'] as const,

  list: () => [...creditApplicationKeys.lists()] as const,

  details: () => [...creditApplicationKeys.all, 'detail'] as const,

  detail: (id: string) => [...creditApplicationKeys.details(), id] as const,

  calculate: () => [...creditApplicationKeys.all, 'calculate'] as const,
}
