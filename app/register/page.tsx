import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Register — HELIXA',
  description: 'Create your HELIXA research account.',
}

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join HELIXA to order and track research peptides"
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
        <div className="grid grid-cols-2 gap-3">
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
        <Button type="submit" size="lg" className="mt-1 w-full rounded-full">
          Create account
        </Button>
      </form>
    </AuthShell>
  )
}
