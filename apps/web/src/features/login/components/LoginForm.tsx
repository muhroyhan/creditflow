import { Button } from '@/shadcn/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/ui/field'
import { Input } from '@/shadcn/ui/input'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'

const formSchema = z.object({
  principalAmount: z.number(),
  tenorMonth: z.number(),
})

const LoginForm = () => {
  const form = useForm({
    defaultValues: { principalAmount: 0, tenorMonth: 0 },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

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
            name="tenorMonth"
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
    </>
  )
}

export { LoginForm }
