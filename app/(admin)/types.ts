export type Account = {
  id: string
  name: string
  isPaper: boolean
  tally: {
    cash: number
    equity: number
    profitsTaken: number
    totalInvested: number
    availableCash: number
    realizedProfit: number
    capitalIncludingProfits: number
  }
}
