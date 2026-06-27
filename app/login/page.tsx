import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Login — GEN+',
  description: 'Sign in to your GEN+ research account.',
}

export default function LoginPage() {
  return (
    <>
      <AuthShell
        title="Welcome back"
        subtitle="Sign in to manage your orders and COAs"
        footer={
          <>
            New to GEN+?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@lab.com" className="mt-1.5" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Forgot?
              </Link>
            </div>
            <Input id="password" type="password" required placeholder="••••••••" className="mt-1.5" />
          </div>
          <Button type="submit" size="lg" variant="gradient" className="mt-2 w-full rounded-full">
            Sign in
          </Button>
        </form>
      </AuthShell>

      {/* Research use disclaimer */}
      <section id="disclaimer" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12 pb-20 sm:px-6 lg:px-8 lg:py-20 lg:pb-28">
        <div className="rounded-3xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold">Research use only disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            All products sold by GEN+ are intended strictly for in-vitro laboratory
            research and development purposes only. They are not drugs, foods, or
            cosmetics, and may not be used as such. They are not intended for human or
            veterinary use, diagnosis, treatment, or prevention of any disease. By
            purchasing, you confirm you are a qualified researcher or institution.
          </p>
        </div>
      </section>
    </>
  )
}
