import { SignIn } from '@clerk/nextjs'
import { AuthPage } from '../components/AuthPage'
import { AuthForm } from '../components/AuthForm'
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
