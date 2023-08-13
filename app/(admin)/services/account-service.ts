import 'server-only'

import { XataClient } from '@/app/xata'
import { v4 as uuidV4 } from 'uuid'
import { Inject, Service } from 'typedi'
import { AccountCreationData, AccountDtoSchema } from '../schemas'

type AccountFilteringCriteria = { id?: string; name?: string; user?: string }
type AccountCreationDataCriteria = AccountCreationData & { user: string }

@Service()
export class AccountService {
  @Inject() private xata!: XataClient

  private selectAccount() {
    return this.xata.db.Account.select(['*', 'tally.*'])
  }

  async getAccountsByUserId(userId: string) {
    const records = await this.selectAccount().filter({ user: userId }).getAll()
    return records?.map((record) => AccountDtoSchema.parse(record))
  }

  async getAccountByCriteria({ name, user }: AccountFilteringCriteria) {
    const record = await this.selectAccount().filter({ name, user }).getFirst()
    return record ? AccountDtoSchema.parse(record) : null
  }

  async createAccount(accountData: AccountCreationDataCriteria) {
    const tallyId = uuidV4()
    const accountId = uuidV4()

    await this.xata.transactions.run([
      {
        insert: {
          table: 'Account',
          record: { ...accountData, id: accountId },
          createOnly: true,
        },
      },
      {
        insert: {
          table: 'Tally',
          record: { id: tallyId, account: accountId },
          createOnly: true,
        },
      },
      {
        update: {
          table: 'Account',
          id: accountId,
          fields: { tally: tallyId },
        },
      },
      {
        insert: {
          table: 'AssetDefaults',
          record: { account: accountId },
          createOnly: true,
        },
      },
    ])

    return await this.getAccountByCriteria({ id: accountId })
  }
}
