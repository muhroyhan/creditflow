import { Button } from '@/shadcn/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/ui/field'
import { Input } from '@/shadcn/ui/input'
import { calculateCreditInstallment } from '@/utils/calculateCreditInstallment'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'

const formSchema = z.object({
  loan: z.number(),
  tenor: z.number(),
})

const AddEditCreditApplication = () => {
  const form = useForm({
    defaultValues: { loan: 0, tenor: 0 },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      const calculate = calculateCreditInstallment(value)
      console.log(calculate)
    },
  })

  return (
    <form
      id="credit-application-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="loan"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Loan</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                placeholder="1000000"
                type="number"
                value={field.state.value}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />
        <form.Field
          name="tenor"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Tenor</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
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
  )
}

export default AddEditCreditApplication
