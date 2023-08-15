import { AddAccountFormTrigger, AddAccountFormTriggerButton } from './add-account-form-trigger'

export function NoAccountsPane() {
  return (
    <div className="flex flex-col gap-1 items-center mx-auto mt-36">
      <h2 className="font-medium tracking-tight text-2xl">Create an account</h2>
      <p className="text-lg text-muted-foreground max-w-md text-center leading-relaxed">
        Add the alpaca trading accounts that you to be traded with the Trekatrade bot
      </p>
      <div className="mt-4">
        <AddAccountFormTrigger>
          <AddAccountFormTriggerButton />
        </AddAccountFormTrigger>
      </div>
    </div>
  )
}
