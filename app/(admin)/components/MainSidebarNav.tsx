'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/app/components/ui/button'

const menuItems: NavMenuItemProps[] = [
  { href: '/admin', label: 'Accounts', isActive: true },
  { href: '/admin/settings', label: 'Settings', isActive: false },
]

export function MainSidebarNav() {
  const pathname = usePathname()

  return (
    <NavMenu>
      {menuItems.map((item) => (
        <NavMenuItem
          key={item.label}
          href={item.href}
          label={item.label}
          isActive={item.href === pathname}
        />
      ))}
    </NavMenu>
  )
}

type NavMenuProps = {
  children: React.ReactNode
}

function NavMenu({ children }: NavMenuProps) {
  return (
    <nav className="flex flex-col">
      <ul className="list-none w-full">{children}</ul>
    </nav>
  )
}

type NavMenuItemProps = {
  href: string
  label: string
  isActive?: boolean
}

function NavMenuItem({ href, label, isActive }: NavMenuItemProps) {
  return (
    <li>
      <Link
        className={cn(
          buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }),
          'justify-start w-full font-normal tracking-tight',
          {
            'hover:bg-muted': isActive,
            'hover:underline hover:bg-transparent -mt-1': !isActive,
            // 'text-muted-foreground': !isActive,
          }
        )}
        href={href}>
        {label}
      </Link>
    </li>
  )
}
