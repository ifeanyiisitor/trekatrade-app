import { z } from 'zod'

export type AccountData = z.infer<typeof accountDataSchema>

export const accountDataSchema = z.object({
  name: z
    .string({ required_error: 'Please enter an name' })
    .nonempty({ message: 'Please enter an name' })
  alpacaApiKey: z
    .string({ required_error: 'Please enter your alpaca api key' })
    .nonempty({ message: 'Please enter your alpaca api key' }),
  alpacaApiSecret: z
    .string({ required_error: 'Please enter your alpaca api secret' })
    .nonempty({ message: 'Please enter your alpaca api secret' }),
  isPaper: z.boolean().optional().default(false),
})
