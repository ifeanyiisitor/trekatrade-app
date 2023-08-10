import Link from 'next/link'
import { use } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { asMoney } from '@/lib/utils'
import { getCurrentUserAccounts } from '../actions/getCurrentUserAccounts'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/app/components/ui/table'

export function AccountsTable() {
  const accounts = use(getCurrentUserAccounts())

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-10">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capital</TableHead>
          <TableHead>Value of capital</TableHead>
          <TableHead>Total invested</TableHead>
          <TableHead>Profits taken</TableHead>
          <TableHead>Available cash</TableHead>
          <TableHead className="pr-10 text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => {
          const href = `/accounts/${account.id}`

          return (
            <TableRow key={account.id} className="cursor-pointer">
              <Cell href={href} className="pl-10">
                {account.name}
              </Cell>
              <Cell href={href}>
                <Badge variant="secondary" className="font-normal">
                  {account.isPaper ? 'Paper' : 'Live'}
                </Badge>
              </Cell>
              <Cell href={href}>
                {asMoney(account.tally.capitalIncludingProfits)}
              </Cell>
              <Cell href={href}>{asMoney(account.tally.equity)}</Cell>
              <Cell href={href}>{asMoney(account.tally.totalInvested)}</Cell>
              <Cell href={href}>{asMoney(account.tally.realizedProfit)}</Cell>
              <Cell href={href}>{asMoney(account.tally.cash)}</Cell>
              <TableCell className="pr-10 text-right flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

type CellProps = {
  href: string
  children: React.ReactNode
  className?: string
}

function Cell({ href, children, className }: CellProps) {
  return (
    <TableCell className={className}>
      <Link href={href}>{children}</Link>
    </TableCell>
  )
}
