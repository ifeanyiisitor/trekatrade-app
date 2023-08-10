import currency from 'currency.js'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asMoney(value?: number | null) {
  const amt = value ?? 0
  return currency(amt).format()
}
