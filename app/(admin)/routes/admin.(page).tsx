import { use } from 'react'
import { AccountsPane } from '../components/AccountsPane'
import { NoAccountsPane } from '../components/NoAccountsPane'
import { getCurrentUserAccounts } from '../actions/getCurrentUserAccounts'

export default function AdminPage() {
  const accounts = use(getCurrentUserAccounts())
  return !accounts.length ? <NoAccountsPane /> : <AccountsPane />
}
