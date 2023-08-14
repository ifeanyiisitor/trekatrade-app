'use client'

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/app/components/ui/form'

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/app/components/ui/sheet'

import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Switch } from '@/app/components/ui/switch'
import { UseForm } from '@/app/hooks/use-form'
import { useState } from 'react'
import { addCurrentUserAccount } from '../actions/add-current-user-account'
import { ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { AccountCreationData, AccountCreationDataSchema } from '../schemas'

type FormTriggerProps = {
  children?: React.ReactNode
}

export function AddAccountFormTrigger({ children }: FormTriggerProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const form = UseForm({
    action: addCurrentUserAccount,
    schema: AccountCreationDataSchema,
    onSuccess: () => setSheetOpen(false),
    defaultValues: {
      name: '',
      alpacaApiKey: '',
      alpacaApiSecret: '',
      isPaper: false,
    },
  })

  function handleSheetOpenChange(open: boolean) {
    setSheetOpen(open)
    if (!open) form.reset()
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <div onClick={() => setSheetOpen(true)}>{children}</div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Add an Alpaca Account</SheetTitle>
          <SheetDescription>
            Add the paper or live alpaca account that the bot should trade
          </SheetDescription>
        </SheetHeader>
        <AddAccountForm {...{ form }} />
      </SheetContent>
    </Sheet>
  )
}

type FormProps = {
  form: ReturnType<typeof UseForm<AccountCreationData>>
}

function AddAccountForm({ form }: FormProps) {
  return (
    <Form {...form.props}>
      <form
        onSubmit={form.handleSubmit}
        className="mt-8  flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          {form.errorMessage && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>You have some issues</AlertTitle>
              <AlertDescription>{form.errorMessage}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={form.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alpacaApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alpaca api key</FormLabel>
                <FormControl>
                  <Input disabled={form.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alpacaApiSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alpaca api secret</FormLabel>
                <FormControl>
                  <Input disabled={form.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPaper"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Paper Trading?</FormLabel>
                  <FormControl>
                    <Switch
                      disabled={form.isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add Account
        </Button>
      </form>
    </Form>
  )
}

export function AddAccountFormTriggerButton() {
  return <Button className="font-normal">Add Account</Button>
}
