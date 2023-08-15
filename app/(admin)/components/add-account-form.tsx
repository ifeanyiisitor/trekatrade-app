'use client'

import Form from '@/app/components/smart-form'
import { Button } from '@/app/components/ui/button'
import { addCurrentUserAccount } from '../actions/add-current-user-account'
import { UseFormResult, useForm } from '@/app/hooks/use-form'
import { AccountCreationDataSchema } from '../schemas'
import { MutableRefObject } from 'react'

type Props = {
  formRef?: MutableRefObject<UseFormResult<any> | undefined>
  onSuccess?: () => void
}

export function AddAccountForm({ formRef, onSuccess }: Props) {
  const form = useForm({
    ref: formRef,
    action: addCurrentUserAccount,
    schema: AccountCreationDataSchema,
    onSuccess,
    defaultValues: {
      name: '',
      alpacaApiKey: '',
      alpacaApiSecret: '',
      isPaper: false,
    },
  })

  return (
    <Form form={form} grow justifyBetween>
      <Form.Inputs>
        <Form.ErrorAlert form={form} />
        <Form.TextField form={form} name="name" label="Name" />
        <Form.TextField form={form} name="alpacaApiKey" label="Alpaca api key" />
        <Form.TextField form={form} name="alpacaApiSecret" label="Alpaca api secret" />
        <Form.SwitchField form={form} name="isPaper" label="Paper Trading?" />
      </Form.Inputs>
      <Form.SubmitButton form={form} label="Add Account" />
    </Form>
  )
}

export function AddAccountFormTriggerButton() {
  return <Button className="font-normal">Add Account</Button>
}
