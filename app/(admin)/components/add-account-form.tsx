'use client'

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/app/components/ui/sheet'

import { Button } from '@/app/components/ui/button'
import { SmartForm } from '@/app/components/smart-form'
import { useSafeRef } from '@/app/hooks/use-safe-ref'
import { addCurrentUserAccount } from '../actions/add-current-user-account'
import { UseFormResult, useForm } from '@/app/hooks/use-form'
import { AccountCreationDataSchema } from '../schemas'
import { MutableRefObject, useState } from 'react'

type FormTriggerProps = {
  children?: React.ReactNode
}

export function AddAccountFormTrigger({ children }: FormTriggerProps) {
  const formRef = useSafeRef<UseFormResult>()
  const [sheetOpen, setSheetOpen] = useState(false)

  function onFormSuccess() {
    setSheetOpen(false)
  }

  function handleSheetOpenChange(open: boolean) {
    setSheetOpen(open)
    if (!open) formRef.current.reset()
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <div onClick={() => setSheetOpen(true)}>{children}</div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>Add an Alpaca Account</SheetTitle>
          <SheetDescription>
            Add the paper or live alpaca account that the bot should trade
          </SheetDescription>
        </SheetHeader>
        <AddAccountForm formRef={formRef} onSuccess={onFormSuccess} />
      </SheetContent>
    </Sheet>
  )
}

type FormProps = {
  formRef?: MutableRefObject<UseFormResult<any> | undefined>
  onSuccess?: () => void
}

function AddAccountForm({ formRef, onSuccess }: FormProps) {
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
    <SmartForm form={form} grow justifyBetween>
      <SmartForm.Inputs>
        <SmartForm.ErrorAlert form={form} />
        <SmartForm.TextField form={form} name="name" label="Name" />
        <SmartForm.TextField
          form={form}
          name="alpacaApiKey"
          label="Alpaca api key"
        />
        <SmartForm.TextField
          form={form}
          name="alpacaApiSecret"
          label="Alpaca api secret"
        />
        <SmartForm.SwitchField
          form={form}
          name="isPaper"
          label="Paper Trading?"
        />
      </SmartForm.Inputs>
      <SmartForm.SubmitButton form={form} label="Add Account" />
    </SmartForm>
  )
}

export function AddAccountFormTriggerButton() {
  return <Button className="font-normal">Add Account</Button>
}
