import Link from 'next/link'
import { Send, MessageCircle, Globe, Mail, MapPin } from 'lucide-react'

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'All Peptides', href: '/catalog' },
      { label: 'Bundles & Stacks', href: '/catalog#bundles' },
      { label: 'Peptide Calculator', href: '/calculator' },
      { label: 'New Arrivals', href: '/catalog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About GEN+', href: '/about' },
      { label: 'Quality & Testing', href: '/about#quality' },
      { label: 'Support', href: '/support' },
      { label: 'FAQ', href: '/support#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Research Use Only', href: '/support#disclaimer' },
      { label: 'Terms of Service', href: '/support' },
      { label: 'Privacy Policy', href: '/support' },
      { label: 'Shipping & Returns', href: '/support' },
    ],
  },
]

const socials = [
  { label: 'Email', href: 'mailto:hello@genplus.bio', Icon: Mail },
  { label: 'Telegram', href: 'https://t.me/genplusbio', Icon: Send },
  { label: 'Community', href: 'https://t.me/genplusbio', Icon: MessageCircle },
  { label: 'Website', href: 'https://genplus.bio', Icon: Globe },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center" aria-label="GEN+ home">
              <span className="holo-text text-2xl font-black italic tracking-tight">GEN+</span>
            </Link>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next Genetics. Enhanced.
            </p>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Ultra-high purity synthetic research peptides, third-party tested and
              shipped worldwide. For laboratory and research use only.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:hello@genplus.bio" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4" /> hello@genplus.bio
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" /> Tallinn, Estonia
              </span>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GEN+ · Next Genetics. For research use only.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
