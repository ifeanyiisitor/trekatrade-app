import { Props } from '@/lib/types'
import { MainSidebarNav } from '../components/MainSidebarNav'

export default function AdminPageLayout({ children }: Props) {
  return (
    <div className="h-screen flex overflow-hidden">
      <header className="hidden">
        <h1>Trekatrade Admin</h1>
      </header>
      <aside className="flex flex-col w-52 border-r">
        <div className="text-lg font-semibold tracking-tight mx-8 mt-5 mb-4">
          Trekatrade
        </div>
        <div className="px-4 flex-1">
          <MainSidebarNav />
        </div>
        <div className="px-2 pb-6">...</div>
      </aside>
      <main className="flex flex-col w-0 flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
