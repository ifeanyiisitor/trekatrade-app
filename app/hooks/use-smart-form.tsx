import { FieldValues } from 'react-hook-form'
import { UseFormProps, useForm } from './use-form'
import { useMemo } from 'react'

import {
  SmartForm,
  SmartFormInputs,
  SmartFormTextField,
  SmartFormSwitchField,
  SmartFormSubmitButton,
  SmartFormTextFieldProps,
  SmartFormSubmitButtonProps,
  SmartFormSwitchFieldProps,
  SmartFormErrorAlertProps,
  SmartFormErrorAlert,
  SmartFormProps,
} from '../components/smart-form'

/**
 * `useSmartForm` is an experimental hook that wraps around the `useForm` hook and provides
 * additional utility by offering pre-configured components that are bound to the form state.
 *
 * The primary benefit of using this hook is the reduction of boilerplate when setting up forms,
 * as the components returned by this hook are already set up to work with the form state.
 *
 * @param props - The properties required to set up the form and its validation logic.
 * @returns An object containing the form API and a set of components pre-configured to work with the form state.
 *
 * Example Usage:
 *
 * ```typescript
 * const { Form } = useSmartForm({ ...props });
 *
 * return (
 *   <Form>
 *     <Form.Inputs>
 *       <Form.ErrorAlert />
 *       <Form.TextField name="username" label="Username" />
 *       <Form.SwitchField name="rememberMe" label="Remember Me?" />
 *     </Form.Inputs>
 *     <Form.SubmitButton label="Submit" />
 *   </Form>
 * );
 * ```
 */
export function useSmartForm<V extends FieldValues>(props: UseFormProps<V>) {
  const form = useForm(props)
  const api = { form }

  const FormTextField = useMemo(() => {
    function FormTextField(props: Omit<SmartFormTextFieldProps<V>, 'form'>) {
      const { form } = FormTextField.api
      return <SmartFormTextField form={form} {...props} />
    }

    FormTextField.api = api
    return FormTextField
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FormSwitchField = useMemo(() => {
    function FormSwitchField(props: Omit<SmartFormSwitchFieldProps<V>, 'form'>) {
      const { form } = FormSwitchField.api
      return <SmartFormSwitchField form={form} {...props} />
    }

    FormSwitchField.api = api
    return FormSwitchField
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FormSubmitButton = useMemo(() => {
    function FormSubmitButton(props: Omit<SmartFormSubmitButtonProps<V>, 'form'>) {
      const { form } = FormSubmitButton.api
      return <SmartFormSubmitButton form={form} {...props} />
    }

    FormSubmitButton.api = api
    return FormSubmitButton
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FormErrorAlert = useMemo(() => {
    function FormErrorAlert(props: Omit<SmartFormErrorAlertProps<V>, 'form'>) {
      const { form } = FormErrorAlert.api
      return <SmartFormErrorAlert form={form} {...props} />
    }

    FormErrorAlert.api = api
    return FormErrorAlert
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Form = useMemo(() => {
    function Form({ children }: Omit<SmartFormProps, 'form'>) {
      const { form } = Form.api
      return <SmartForm form={form}>{children}</SmartForm>
    }

    Form.api = api
    Form.Inputs = SmartFormInputs
    Form.TextField = FormTextField
    Form.ErrorAlert = FormErrorAlert
    Form.SwitchField = FormSwitchField
    Form.SubmitButton = FormSubmitButton
    return Form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  Form.api = api
  FormTextField.api = api
  FormSwitchField.api = api

  return { form, Form }
}
