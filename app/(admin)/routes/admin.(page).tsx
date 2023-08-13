import { use } from 'react'
import { AccountsPane } from '../components/accounts-pane'
import { NoAccountsPane } from '../components/no-accounts-pane'
import { getCurrentUserAccounts } from '../actions/get-current-user-accounts'

export default function AdminPage() {
  const accounts = use(getCurrentUserAccounts())
  return !accounts.length ? <NoAccountsPane /> : <AccountsPane />
}
