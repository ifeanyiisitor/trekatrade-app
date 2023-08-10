import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { ComponentProps } from 'react'

type SideMenuProps = {
  children: React.ReactNode
}

export function SideMenu({ children }: SideMenuProps) {
  return <ul className="list-none w-full">{children}</ul>
}

type SideMenuItemProps = {
  href: string
  isActive?: boolean
  children: React.ReactNode
  variant?: ComponentProps<typeof Button>['variant']
  cn?: Parameters<typeof cn>[0]
}

SideMenu.Item = function SideMenuItem({
  href,
  isActive,
  children,
  variant = 'ghost',
  cn: classNames = [],
}: SideMenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant }),
          'justify-start w-full font-normal tracking-tight',
          { 'text-muted-foreground': !isActive },
          classNames
        )}>
        {children}
      </Link>
    </li>
  )
}
