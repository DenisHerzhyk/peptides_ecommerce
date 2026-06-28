import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Register — GEN+',
  description: 'Create your GEN+ research account.',
}

export default function RegisterPage() {
  return (
    <>
      <AuthShell
        title="Create your account"
        subtitle="Join GEN+ to order and track research peptides"
        footer={
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="first">First name</Label>
              <Input id="first" required placeholder="Alex" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="last">Last name</Label>
              <Input id="last" required placeholder="Mercer" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@lab.com" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required placeholder="••••••••" className="mt-1.5" />
          </div>
          <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <input type="checkbox" required className="mt-0.5 size-4 rounded border-border accent-[var(--primary)]" />
            I confirm I am a qualified researcher and agree to the research-use-only terms.
          </label>
          <Button type="submit" size="lg" variant="gradient" className="mt-1 w-full rounded-full">
            Create account
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
