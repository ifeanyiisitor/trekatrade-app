'use client'

import { SideMenu } from './side-menu'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/admin', label: 'Accounts', isActive: true },
  { href: '/admin/settings', label: 'Settings', isActive: false },
]

export function MainSideMenu() {
  const pathname = usePathname()
  return (
    <SideMenu>
      {menuItems.map((item) => {
        const isActive = item.href === pathname
        return (
          <SideMenu.Item
            key={item.label}
            href={item.href}
            isActive={isActive}
            variant={isActive ? 'secondary' : 'ghost'}
            cn={{
              'hover:bg-muted': isActive,
              'hover:underline hover:bg-transparent  -mt-1': !isActive,
            }}>
            {item.label}
          </SideMenu.Item>
        )
      })}
    </SideMenu>
  )
}
