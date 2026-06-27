import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 holo-gradient-animated opacity-40" aria-hidden />
      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-xl">
          <Link href="/" className="mx-auto block w-44" aria-label="GEN+ home">
            <Image
              src="/gen-plus-logo.jpg"
              alt="GEN+ — Next Genetics. Enhanced."
              width={1280}
              height={853}
              className="h-auto w-full rounded-xl"
              priority
            />
          </Link>
          <h1 className="mt-6 text-center text-2xl font-black tracking-tight">{title}</h1>
          <p className="mt-1.5 text-center text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </div>
  )
}
