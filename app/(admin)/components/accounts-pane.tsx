import tw from 'tailwind-styled-components'
import { AccountsTable } from './accounts-table'
import { AddAccountFormTrigger, AddAccountFormTriggerButton } from './add-account-form-trigger'

const Header = tw.header`flex justify-between items-center border-b p-8 pl-10 pr-10`
const Heading = tw.div`flex flex-col gap-2`
const HeadingTitle = tw.h2`font-medium tracking-tighter text-5xl`
const HeadingSubtitle = tw.p`text-md text-muted-foreground font-light tracking-tight max-w-md leading-normal`

export function AccountsPane() {
  return (
    <>
      <Header>
        <Heading>
          <HeadingTitle>Accounts</HeadingTitle>
          <HeadingSubtitle>View and manage your account</HeadingSubtitle>
        </Heading>
        <AddAccountFormTrigger>
          <AddAccountFormTriggerButton />
        </AddAccountFormTrigger>
      </Header>
      <AccountsTable />
    </>
  )
}
