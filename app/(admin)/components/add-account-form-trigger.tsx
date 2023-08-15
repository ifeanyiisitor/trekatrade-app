'use client'

import { useDrawer } from '@/app/hooks/use-drawer'
import { useSafeRef } from '@/app/hooks/use-safe-ref'
import { UseFormResult } from '@/app/hooks/use-form'
import { AddAccountForm } from './add-account-form'
import { Button } from '@/app/components/ui/button'

type Props = {
  children?: React.ReactNode
}

export function AddAccountFormTrigger({ children }: Props) {
  const formRef = useSafeRef<UseFormResult>()

  const { Drawer, closeDrawer } = useDrawer({
    onClose: () => formRef.current.reset(),
  })

  return (
    <Drawer>
      <Drawer.Trigger>{children}</Drawer.Trigger>
      <Drawer.Content forForm>
        <Drawer.Header>
          <Drawer.Title>Add an Alpaca Account</Drawer.Title>
          <Drawer.Description>
            Add the paper or live alpaca account that the bot should trade
          </Drawer.Description>
        </Drawer.Header>
        <AddAccountForm formRef={formRef} onSuccess={closeDrawer} />
      </Drawer.Content>
    </Drawer>
  )
}

export function AddAccountFormTriggerButton() {
  return <Button className="font-normal">Add Account</Button>
}
