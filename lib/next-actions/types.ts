import { ZodIssue } from 'zod'

export type ActionResponse = ActionSuccessResponse | ActionErrorResponse

export type ActionErrorResponseType =
  | 'authentication'
  | 'validation'
  | 'unknown'

export type ActionSuccessResponse = {
  status: 'success'
  data?: unknown
}

export type ActionErrorResponse = {
  status: 'error'
  message: string
  type: ActionErrorResponseType
  issues?: ZodIssue[]
  data?: unknown
}

export type ActionValidationErrorResponse = ActionErrorResponse & {
  type: 'validation'
  issues: ZodIssue[]
}
