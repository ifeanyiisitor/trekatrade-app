import { SignIn } from '@clerk/nextjs'
import { AuthPage } from '../components/auth-page'
import { AuthForm } from '../components/auth-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Access your account | Trekatrade',
  description: 'Sign in to your Trekatrade account',
}

export default function SignInPage() {
  return (
    <AuthPage>
      <AuthForm type={SignIn} />
    </AuthPage>
  )
}
