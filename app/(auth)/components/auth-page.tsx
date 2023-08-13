type Props = {
  children: React.ReactNode
}

export function AuthPage({ children }: Props) {
  return (
    <div className="flex h-screen relative">
      <header className="absolute top-0 left-0 px-10 pt-8">
        <h1 className="font-medium text-2xl tracking-tight text-white">
          Trekatrade
        </h1>
      </header>
      <aside className="w-[40%] bg-primary flex flex-col justify-center text-white">
        <div className="flex items-center px-10 mt-16">
          <div className="text-8xl font-medium -ml-1" aria-hidden="true">
            T
          </div>
          <p className="-ml-4 mt-2 max-w-xl">
            <span className="hidden">T</span>
            rekatrade is your automated trading helper. Helping you to buy low
            and sell high, all at the touch of a button.
          </p>
        </div>
      </aside>
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
      <footer className="absolute bottom-0 left-0 px-10 pb-8 tracking-tight text-xs font-light text-white">
        Copyright © 2023 Trekatrade
      </footer>
    </div>
  )
}
