'use client'

import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  Form,
} from '@/app/components/ui/form'

import { cn } from '@/lib/utils'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Switch } from '@/app/components/ui/switch'
import { useForm } from '@/app/hooks/use-form'
import { ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { FieldPath, FieldValues } from 'react-hook-form'
import { ReactNode } from 'react'

export type SmartFormProps = {
  form: ReturnType<typeof useForm<any>>
  children?: ReactNode
  className?: string
  justifyBetween?: boolean
  grow?: boolean
}

export function SmartForm({ form, children, className, justifyBetween, grow }: SmartFormProps) {
  return (
    <Form {...form.props}>
      <form
        onSubmit={form.handleSubmit}
        className={cn(
          'flex flex-col gap-10',
          {
            'flex-grow': grow,
            'justify-between': justifyBetween,
          },
          className
        )}>
        {children}
      </form>
    </Form>
  )
}

type SmartFormInputsProps = {
  children: ReactNode
}

export function SmartFormInputs({ children }: SmartFormInputsProps) {
  return <div className="space-y-6">{children}</div>
}

export type SmartFormErrorAlertProps<V extends FieldValues> = {
  form: ReturnType<typeof useForm<V>>
}

export function SmartFormErrorAlert<V extends FieldValues>({ form }: SmartFormErrorAlertProps<V>) {
  return (
    <>
      {form.errorMessage && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>You have some issues</AlertTitle>
          <AlertDescription>{form.errorMessage}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

export type SmartFormTextFieldProps<V extends FieldValues> = {
  form: ReturnType<typeof useForm<V>>
  name: FieldPath<V>
  label: string
}

export function SmartFormTextField<V extends FieldValues>({
  form,
  name,
  label,
}: SmartFormTextFieldProps<V>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={form.isSubmitting} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type SmartFormSwitchFieldProps<V extends FieldValues> = {
  form: ReturnType<typeof useForm<V>>
  name: FieldPath<V>
  label: string
}

export function SmartFormSwitchField<V extends FieldValues>({
  form,
  name,
  label,
}: SmartFormSwitchFieldProps<V>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Switch
                disabled={form.isSubmitting}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type SmartFormSubmitButtonProps<V extends FieldValues> = {
  form: ReturnType<typeof useForm<V>>
  label: string
}

export function SmartFormSubmitButton<V extends FieldValues>({
  form,
  label,
}: SmartFormSubmitButtonProps<V>) {
  return (
    <Button type="submit" disabled={form.isSubmitting}>
      {form.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}

SmartForm.Inputs = SmartFormInputs
SmartForm.TextField = SmartFormTextField
SmartForm.ErrorAlert = SmartFormErrorAlert
SmartForm.SwitchField = SmartFormSwitchField
SmartForm.SubmitButton = SmartFormSubmitButton

export default SmartForm
