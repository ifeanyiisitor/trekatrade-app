import { SignUp } from '@clerk/nextjs'
import { AuthPage } from '../components/auth-page'
import { AuthForm } from '../components/auth-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create a new account | Trekatrade',
  description: 'Join Trekatrade and start your journey today',
}

export default function SignUpPage() {
  return (
    <AuthPage>
      <AuthForm type={SignUp} />
    </AuthPage>
  )
}
