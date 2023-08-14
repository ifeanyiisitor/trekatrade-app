import * as rhf from 'react-hook-form'
import { useState } from 'react'
import { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionResponse } from '@/lib/next-actions/types'
import { setFormServerValidationIssues } from '@/lib/next-actions/client-utils'

import {
  isActionError,
  isActionSuccess,
  isActionValidationError,
} from '@/lib/next-actions/guards'

type UseFormProps<V extends rhf.FieldValues> = rhf.UseFormProps<V> & {
  schema: ZodSchema<unknown>
  action: (data: V) => Promise<ActionResponse>
  onSuccess?: () => void
}

export function UseForm<V extends rhf.FieldValues>({
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

  return {
    ...rhfForm,
    props: rhfForm,
    control: rhfForm.control,
    handleSubmit: rhfForm.handleSubmit(onSubmit),
    isSubmitting,
    errorMessage,
    reset,
  }
}
