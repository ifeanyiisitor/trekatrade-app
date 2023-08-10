'use server'

import wait from 'wait'
import { cached } from '@/lib/next'
import { Account } from '../types'

export const getCurrentUserAccounts = cached({
  tags: ['current-user-accounts'],
  query: async () => {
    await wait(1000)
    return [
      {
        id: '123',
        name: 'ifeanyi-paper',
        isPaper: true,
        tally: {
          cash: 540,
          equity: 1000,
          profitsTaken: 0,
          totalInvested: 1000,
          availableCash: 1000,
          realizedProfit: 386,
          capitalIncludingProfits: 1000,
        },
      },
      {
        id: '124',
        name: 'ifeanyi-live',
        isPaper: false,
        tally: {
          cash: 280,
          equity: 1000,
          profitsTaken: 0,
          totalInvested: 1000,
          availableCash: 1000,
          realizedProfit: 184,
          capitalIncludingProfits: 1000,
        },
      },
    ] satisfies Account[]
  },
})
