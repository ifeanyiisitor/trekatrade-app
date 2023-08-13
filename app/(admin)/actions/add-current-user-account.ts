'use server'

import 'server-only'
import wait from 'wait'
import { AccountData } from '../schemas'

export async function addCurrentUserAccount(accountData: AccountData) {
  await wait(2000)
  // TODO: IMPLEMENT
}
