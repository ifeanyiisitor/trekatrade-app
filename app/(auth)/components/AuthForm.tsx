import { SignIn } from '@clerk/nextjs'
import { ComponentProps, ComponentType } from 'react'

type FormProps = ComponentProps<typeof SignIn>

type AuthFormProps = {
  type: ComponentType<FormProps>
}

export function AuthForm({ type: Form }: AuthFormProps) {
  return (
    <Form
      appearance={{
        variables: {
          colorPrimary: 'rgb(24, 24, 27)',
        },
      }}
    />
  )
}
