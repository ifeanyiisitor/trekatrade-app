'use server'

import 'server-only'

import { env } from '@/app/env'
import { auth } from '@clerk/nextjs'
import { encrypt } from '@/lib/encryption'
import { ZodError } from 'zod'
import { ActionError } from '@/lib/next-actions/action-error'
import { revalidateTag } from 'next/cache'
import { accountService } from '../container'
import { ActionResponse } from '@/lib/next-actions/types'
import { AccountCreationData, AccountCreationDataSchema } from '../schemas'

export async function addCurrentUserAccount(
  accountData: AccountCreationData
): Promise<ActionResponse> {
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
    if (error instanceof ActionError) {
      return error.serialize()
    } else if (error instanceof Error) {
      return new ActionError({
        message: 'Something went wrong: ' + error.message,
        type: 'unknown',
      }).serialize()
    } else {
      return new ActionError({
        message: 'An unknown error occurred',
        type: 'unknown',
        data: error,
      }).serialize()
    }
  }
}

function ensureUserIsAuthenticated(userId: string | null): asserts userId {
  if (!userId)
    throw new ActionError({
      message: 'User is not authenticated',
      type: 'authentication',
    })
}

function ensureAccountDataIsValid(accountData: AccountCreationData) {
  try {
    AccountCreationDataSchema.parse(accountData)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ActionError({
        message: 'The account data is invalid',
        type: 'validation',
        issues: error.errors,
      })
    }
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
    throw new ActionError({
      type: 'validation',
      message:
        'There is a problem with the account name that you have supplied',
      issues: [
        {
          path: ['name'],
          message: 'An account with this name already exists',
          code: 'custom',
        },
      ],
    })
  }
}
