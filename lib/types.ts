export type Props = {
  children: React.ReactNode
}

export type Unpromisify<T> = T extends Promise<infer R> ? R : T
