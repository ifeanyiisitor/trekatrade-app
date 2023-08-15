'use client'

import { UseFormResult } from '@/app/hooks/use-form'
import { addCurrentUserAccount } from '../actions/add-current-user-account'
import { AccountCreationData, AccountCreationDataSchema } from '../schemas'
import { MutableRefObject } from 'react'
import { useSmartForm } from '@/app/hooks/use-smart-form'

type Props = {
  formRef?: MutableRefObject<UseFormResult<any> | undefined>
  onSuccess?: () => void
}

export function AddAccountForm({ formRef, onSuccess }: Props) {
  const { Form } = useSmartForm<AccountCreationData>({
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
    <Form grow justifyBetween>
      <Form.Inputs>
        <Form.ErrorAlert />
        <Form.TextField name="name" label="Name" />
        <Form.TextField name="alpacaApiKey" label="Alpaca api key" />
        <Form.TextField name="alpacaApiSecret" label="Alpaca api secret" />
        <Form.SwitchField name="isPaper" label="Paper Trading?" />
      </Form.Inputs>
      <Form.SubmitButton label="Add Account" />
    </Form>
  )
}
