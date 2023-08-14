import 'server-only'

import { ZodIssue } from 'zod'
import { ActionErrorResponse, ActionErrorResponseType } from './types'

type ActionErrorProps = {
  message: string
  type?: ActionErrorResponseType
  issues?: ZodIssue[]
  data?: unknown
}

export class ActionError extends Error {
  type: ActionErrorResponseType
  issues?: ZodIssue[]
  data?: unknown

  constructor(props: ActionErrorProps) {
    super(props.message)
    this.type = props.type || 'unknown'
    this.data = props.data
    this.issues = props.issues

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }

  serialize(): ActionErrorResponse {
    return {
      status: 'error',
      message: this.message,
      type: this.type,
      data: this.data,
      issues: this.issues,
    }
  }
}
