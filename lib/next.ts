import { unstable_cache } from 'next/cache'
import { Unpromisify } from './types'

type Callback<R = any> = (...args: any[]) => Promise<R>

type CacheOptions = NonNullable<Parameters<typeof unstable_cache>[2]>

type CachedConfig<T extends Callback> = {
  query: T
  tags: string[]
  revalidate?: CacheOptions['revalidate']
}

export function cached<T extends Callback>({
  query,
  tags,
  revalidate,
}: CachedConfig<T>) {
  return (...args: Parameters<T>) => {
    type R = Unpromisify<ReturnType<T>>
    return unstable_cache<Callback<R>>(query, undefined, {
      tags,
      revalidate,
    })(...args)
  }
}
