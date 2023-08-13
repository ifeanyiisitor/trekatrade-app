'use server'

import 'server-only'
import { auth } from '@clerk/nextjs'
import { cached } from '@/lib/next'
import { accountService } from '../container'

export const getCurrentUserAccounts = cached({
  tags: ['current-user-accounts'],
  query: async () => {
    const { userId } = auth()
    if (!userId) throw new Error('User is not authenticated')
    return await accountService.getAccountsByUserId(userId)
  },
})
