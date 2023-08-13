import { z } from 'zod'

export type AccountCreationData = z.infer<typeof AccountCreationDataSchema>

export const AccountCreationDataSchema = z.object({
  name: z
    .string({ required_error: 'Please enter an name' })
    .nonempty({ message: 'Please enter an name' }),
  alpacaApiKey: z
    .string({ required_error: 'Please enter your alpaca api key' })
    .nonempty({ message: 'Please enter your alpaca api key' }),
  alpacaApiSecret: z
    .string({ required_error: 'Please enter your alpaca api secret' })
    .nonempty({ message: 'Please enter your alpaca api secret' }),
  isPaper: z.boolean().optional().default(false),
})

export const AccountDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  alpacaApiKey: z.string(),
  alpacaApiSecret: z.string(),
  isPaper: z.boolean(),
  tally: z.object({
    id: z.string(),
    cash: z.number(),
    equity: z.number(),
    profitInTheGreen: z.number(),
    totalInvested: z.number(),
    realizedProfit: z.number(),
    capitalIncludingProfits: z.number(),
  }),
})
