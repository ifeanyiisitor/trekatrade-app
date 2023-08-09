import { SignOutButton } from '@clerk/nextjs'
import { Button } from './components/ui/button'

export default function Home() {
  return (
    <main>
      hello
      <SignOutButton>
        <Button>Sign out</Button>
      </SignOutButton>
    </main>
  )
}
