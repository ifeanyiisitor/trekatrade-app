import {
  ActionErrorResponse,
  ActionSuccessResponse,
  ActionValidationErrorResponse,
} from './types'

export function isActionSuccess(
  response: unknown
): response is ActionSuccessResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response['status'] === 'success'
  )
}

export function isActionError(
  response: unknown
): response is ActionErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response['status'] === 'error'
  )
}
export function isActionValidationError(
  response: unknown
): response is ActionValidationErrorResponse {
  return isActionError(response) && response.type === 'validation'
}
