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
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCurrentUserAccount } from '../actions/add-current-user-account'
import { ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { AccountCreationData, AccountCreationDataSchema } from '../schemas'

type Props = {
  children?: React.ReactNode
}

export function AddAccountFormTrigger({ children }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<AccountCreationData>({
    resolver: zodResolver(AccountCreationDataSchema),
    defaultValues: {
      name: '',
      alpacaApiKey: '',
      alpacaApiSecret: '',
    },
  })

  async function onSubmit(values: AccountCreationData) {
    setIsSubmitting(true)
    try {
      if (errorMessage) setErrorMessage(null)
      await addCurrentUserAccount(values)
      setSheetOpen(false)
      form.reset()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong'
      setErrorMessage(errorMessage)
    }
    setIsSubmitting(false)
  }

  function handleSheetOpenChange(open: boolean) {
    setSheetOpen(open)
    if (!open) reset()
  }

  function reset() {
    form.reset()
    setErrorMessage(null)
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8  flex-grow flex flex-col justify-between">
            <div className="space-y-6">
              {errorMessage && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
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
                      <Input disabled={isSubmitting} {...field} />
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
                      <Input disabled={isSubmitting} {...field} />
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
                          disabled={isSubmitting}
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Account
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export function AddAccountFormTriggerButton() {
  return <Button className="font-normal">Add Account</Button>
}
