import { SignUp } from '@clerk/nextjs'
import { AuthPage } from '../components/AuthPage'
import { AuthForm } from '../components/AuthForm'
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
