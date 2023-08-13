import 'server-only'
import 'reflect-metadata'

import { env } from '../env'
import { Container } from 'typedi'
import { XataClient } from '../xata'
import { AccountService } from './services/account-service'

Container.set(
  XataClient,
  new XataClient({
    fetch,
    apiKey: env.XATA_API_KEY,
    branch: env.XATA_BRANCH,
  })
)

export const accountService = Container.get(AccountService)
