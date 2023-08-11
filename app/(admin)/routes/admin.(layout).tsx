import { Props } from '@/lib/types'
import { MainSideMenu } from '../components/MainSideMenu'
import { UserSideMenu } from '../components/UserSideMenu'

export default function AdminPageLayout({ children }: Props) {
  return (
    <div className="h-screen flex overflow-hidden">
      <header className="hidden">
        <h1>Trekatrade Admin</h1>
      </header>
      <aside className="flex flex-col w-52 border-r">
        <header className="mx-8 mt-5 mb-4">
          <div aria-hidden="true">Trekatrade </div>
          <h2 className="hidden text-lg font-semibold tracking-tight">
            Admin Navigation
          </h2>
        </header>
        <nav aria-label="Main Navigation" className="px-4 flex-1">
          <MainSideMenu />
        </nav>
        <footer className="px-2 pb-6">
          <nav aria-label="User Navigation">
            <UserSideMenu />
          </nav>
        </footer>
      </aside>
      <main className="flex flex-col w-0 flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
