import { ZodIssue } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export function setFormServerValidationIssues(
  form: UseFormReturn<any>,
  issues: ZodIssue[]
) {
  issues.forEach((issue) => {
    type FieldName = Parameters<typeof form.setError>[0]
    const fieldName = issue.path[0] as FieldName
    form.setError(fieldName, {
      message: issue.message,
    })
  })
}
