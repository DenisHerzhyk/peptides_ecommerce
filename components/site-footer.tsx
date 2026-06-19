import Link from 'next/link'
import { Instagram, Send, Twitter, Youtube, Mail, MapPin } from 'lucide-react'

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
      { label: 'About HELIXA', href: '/about' },
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
  { label: 'Telegram', href: 'https://t.me/', Icon: Send },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'X / Twitter', href: '#', Icon: Twitter },
  { label: 'YouTube', href: '#', Icon: Youtube },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="size-7 rounded-lg holo-gradient" aria-hidden />
              <span className="text-lg font-black tracking-tight">HELIXA</span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Premium research peptides, third-party tested and shipped worldwide.
              For laboratory and research use only.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:hello@helixa.bio" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4" /> hello@helixa.bio
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
            © {new Date().getFullYear()} HELIXA Research. All rights reserved.
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
