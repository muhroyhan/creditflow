import { Button } from '@/shadcn/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/ui/field'
import { Input } from '@/shadcn/ui/input'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CreateCreditApplicationInput } from '../api/credit_application.types'
import { creditApplicationQueries } from '../api/credit_application.queries'
import { useDebounce } from '@/hooks/use_debounce'
import { creditApplicationMutations } from '../api/credit_application.mutations'

const formSchema = z.object({
  principalAmount: z.number(),
  tenorMonth: z.number(),
})

const AddEditForm = () => {
  const [params, setParams] = useState<CreateCreditApplicationInput>(
    {} as CreateCreditApplicationInput,
  )

  // TS infers: (value: string) => void
  const debounce = useDebounce((data: typeof params) => {
    setParams(data)
  }, 500)
  const { data: result } = useQuery(creditApplicationQueries.calculate(params))
  const { data: created, mutate: create } = useMutation(creditApplicationMutations.create())
  console.log(created)
  const { data: item } = useQuery(creditApplicationQueries.detail(created?.id))
  const form = useForm({
    defaultValues: { principalAmount: 0, tenorMonth: 0 },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      create(value)
    },
  })

  const handleChange = (value: number, name: string) => debounce({ ...params, [name]: value })

  return (
    <>
      <form
        id="credit-application-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="principalAmount"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Loan</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(Number(e.target.value))
                    handleChange(Number(e.target.value), e.target.name)
                  }}
                  placeholder="1000000"
                  type="number"
                  value={field.state.value}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
          <form.Field
            name="tenorMonth"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Tenor</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(Number(e.target.value))
                    handleChange(Number(e.target.value), e.target.name)
                  }}
                  placeholder="1, 3, 5 (in months)"
                  type="number"
                  value={field.state.value}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit">Apply</Button>
      </form>
      <div>Monthly Installment: {result?.monthlyInstallment}</div>
      <div>Total Loan: {result?.totalLoan}</div>
      <div>=======================</div>
      <div>created</div>
      <p>{item?.id}</p>
    </>
  )
}

export default AddEditForm
