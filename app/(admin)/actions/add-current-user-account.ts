'use server'

import 'server-only'

import { env } from '@/app/env'
import { auth } from '@clerk/nextjs'
import { encrypt } from '@/lib/encryption'
import { accountService } from '../container'
import { AccountCreationData, AccountCreationDataSchema } from '../schemas'
import { revalidateTag } from 'next/cache'

export async function addCurrentUserAccount(accountData: AccountCreationData) {
  try {
    const { userId } = auth()

    ensureUserIsAuthenticated(userId)
    ensureAccountDataIsValid(accountData)
    await ensureAccountDoesntAlreadyExist(accountData, userId)

    const encryptionKey = env.ENCRYPTION_KEY
    const alpacaApiKey = encrypt(accountData.alpacaApiKey, encryptionKey)
    const alpacaApiSecret = encrypt(accountData.alpacaApiSecret, encryptionKey)

    await accountService.createAccount({
      ...accountData,
      alpacaApiKey,
      alpacaApiSecret,
      user: userId,
    })

    revalidateTag('current-user-accounts')

    return { status: 'success' }
  } catch (error) {
    if (error instanceof ServerActionError) {
      return error.serialize()
    } else if (error instanceof Error) {
      return new ServerActionError({
        message: error.message,
        type: 'unknown',
      }).serialize()
    } else {
      return new ServerActionError({
        message: 'An unknown error occurred',
        type: 'unknown',
        data: error,
      }).serialize()
    }
  }
}

function ensureUserIsAuthenticated(userId: string | null): asserts userId {
  if (!userId)
    throw new ServerActionError({
      message: 'User is not authenticated',
      type: 'authentication',
    })
}

function ensureAccountDataIsValid(accountData: AccountCreationData) {
  try {
    AccountCreationDataSchema.parse(accountData)
  } catch (error) {
    throw new ServerActionError({
      message: 'The account data is invalid',
      type: 'validation',
      data: error,
    })
  }
}

async function ensureAccountDoesntAlreadyExist(
  accountData: AccountCreationData,
  userId: string
) {
  const existingAccount = await accountService.getAccountByCriteria({
    name: accountData.name,
    user: userId,
  })

  if (existingAccount) {
    throw new ServerActionError({
      message:
        'An account by that name already exists. Please change the account name and try again',
      type: 'duplication',
    })
  }
}

type ServerErrorProps = {
  message: string
  type?: 'authentication' | 'duplication' | 'validation' | 'unknown'
  data?: unknown
}

class ServerActionError extends Error {
  type: ServerErrorProps['type']
  data?: unknown

  constructor(props: ServerErrorProps) {
    super(props.message)
    this.type = props.type || 'unknown'
    this.data = props.data

    // Restore the prototype chain
    Object.setPrototypeOf(this, new.target.prototype)

    // Set the name to the current class name
    this.name = this.constructor.name

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor)
  }

  // Returns a serializable version of the error
  serialize(): Record<string, any> {
    return {
      status: 'error',
      message: this.message,
      type: this.type,
      data: this.data,
    }
  }
}
