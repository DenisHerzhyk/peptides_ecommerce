import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, FlaskConical, Microscope, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'About — HELIXA',
  description: 'HELIXA is a research-first peptide company built on purity, transparency and precision.',
}

const values = [
  { Icon: Microscope, title: 'Science first', text: 'Decisions driven by data, testing, and reproducibility — never hype.' },
  { Icon: ShieldCheck, title: 'Radical transparency', text: 'Public Certificates of Analysis for every batch we ship.' },
  { Icon: FlaskConical, title: 'Uncompromising purity', text: 'ISO-certified manufacturing and HPLC-verified compounds.' },
  { Icon: Globe, title: 'Global standard', text: 'Cold-chain logistics that keep compounds stable worldwide.' },
]

const timeline = [
  { year: '2021', title: 'Founded', text: 'HELIXA started with a simple goal: make research peptides labs can actually trust.' },
  { year: '2022', title: 'In-house QA lab', text: 'We built our own analytics lab for independent batch verification.' },
  { year: '2023', title: '40,000 orders', text: 'Crossed 40k research orders shipped across 30+ countries.' },
  { year: '2024', title: 'Precision tools', text: 'Launched our peptide calculator and research dosing toolkit.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <h1 className="text-pretty text-5xl font-black tracking-tight sm:text-6xl">
            We make peptides <span className="holo-text">labs trust.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            HELIXA is a research-first company combining pharmaceutical-grade sourcing
            with complete batch transparency. Our mission is to remove guesswork from
            peptide research — from purity to precise dosing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="quality">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <Image src="/peptide-hero.png" alt="HELIXA research peptide vials" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Quality you can verify</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every compound is independently analyzed by HPLC and mass spectrometry.
              We publish a Certificate of Analysis for every batch so you always know
              exactly what you are working with — identity, purity, and concentration.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map(({ Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-5">
                  <span className="flex size-10 items-center justify-center rounded-xl holo-gradient">
                    <Icon className="size-5 text-foreground" />
                  </span>
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">Our journey</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t) => (
            <div key={t.year} className="rounded-3xl border border-border bg-card p-6">
              <span className="holo-text text-3xl font-black">{t.year}</span>
              <h3 className="mt-3 font-bold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border p-10 text-center sm:p-16">
          <div className="absolute inset-0 holo-gradient opacity-40" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to explore the catalog?</h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
              Browse lab-verified research peptides and build your stack.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full">
              <Link href="/catalog">Shop peptides</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
