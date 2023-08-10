import { Button } from '@/app/components/ui/button'
import { AccountsTable } from './AccountsTable'

export function AccountsPane() {
  return (
    <>
      <header className="flex justify-between items-center border-b p-8 pl-10 pr-10">
        <div>
          <h2 className="font-medium tracking-tighter text-5xl">Accounts</h2>
          <p className="text-md text-muted-foreground font-light tracking-tight max-w-md leading-normal mt-2">
            View and manage your account
          </p>
        </div>
        <Button className="font-normal">Add Account</Button>
      </header>
      <AccountsTable />
    </>
  )
}
