import 'server-only'

import { XataClient } from '@/app/xata'
import { Inject, Service } from 'typedi'
import { AccountDtoSchema } from '../schemas'

@Service()
export class AccountService {
  @Inject() private xata!: XataClient

  async getAccountsByUserId(userId: string) {
    const records = await this.xata.db.Account.select(['*', 'tally.*'])
      .filter({ user: userId })
      .getAll()
    return records?.map((record) => AccountDtoSchema.parse(record))
  }
}
