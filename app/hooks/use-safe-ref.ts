import { useRef } from 'react'

export function useSafeRef<T>(): { current: T } {
  const ref = useRef<T | null>(null)

  return new Proxy(ref as { current: T }, {
    get(target, prop) {
      if (prop === 'current' && target.current === null) {
        throw new Error(
          'Attempted to access current property of ref when it was null or undefined.'
        )
      }
      return (target as any)[prop]
    },
  })
}
