import * as rhf from 'react-hook-form'
import { MutableRefObject, useState } from 'react'
import { ZodSchema, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionResponse } from '@/lib/next-actions/types'
import { setFormServerValidationIssues } from '@/lib/next-actions/client-utils'

import { isActionError, isActionSuccess, isActionValidationError } from '@/lib/next-actions/guards'

export type UseFormResult<V extends rhf.FieldValues = Record<string, any>> = ReturnType<
  typeof useForm<V>
>

export type UseFormProps<V extends rhf.FieldValues> = rhf.UseFormProps<V> & {
  ref?: MutableRefObject<UseFormResult<V> | undefined>
  schema: ZodSchema<V>
  action: (data: V) => Promise<ActionResponse>
  onSuccess?: () => void
}

export function useForm<V extends rhf.FieldValues>({
  ref,
  schema,
  action,
  onSuccess,
  ...rhfProps
}: UseFormProps<V>) {
  const rhfForm = rhf.useForm({ ...rhfProps, resolver: zodResolver(schema) })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(values: V) {
    setIsSubmitting(true)

    if (errorMessage) setErrorMessage(null)

    const response = await action(values)

    if (isActionValidationError(response)) {
      setFormServerValidationIssues(rhfForm, response.issues)
    } else if (isActionError(response)) {
      setErrorMessage(response.message!)
    } else if (isActionSuccess(response)) {
      rhfForm.reset()
      setIsSubmitting(false)
      if (onSuccess) onSuccess()
    }

    setIsSubmitting(false)
  }

  function reset() {
    rhfForm.reset()
    setErrorMessage(null)
  }

  const api = {
    ...rhfForm,
    props: rhfForm,
    control: rhfForm.control,
    handleSubmit: rhfForm.handleSubmit(onSubmit),
    isSubmitting,
    errorMessage,
    reset,
  }

  if (ref) ref.current = api
  return api
}
