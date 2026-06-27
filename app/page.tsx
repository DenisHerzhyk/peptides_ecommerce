import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, FlaskConical, Truck, Calculator } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products, bundles } from '@/lib/products'

const stats = [
  { value: '99.4%', label: 'Avg. purity' },
  { value: '40k+', label: 'Orders shipped' },
  { value: '24h', label: 'Dispatch time' },
  { value: '4.9/5', label: 'Customer rating' },
]

const features = [
  {
    Icon: ShieldCheck,
    title: 'Third-party tested',
    text: 'Every batch verified by HPLC and mass spectrometry with public Certificates of Analysis.',
  },
  {
    Icon: FlaskConical,
    title: 'Research-grade purity',
    text: 'Lyophilized peptides manufactured in ISO-certified facilities for consistent results.',
  },
  {
    Icon: Truck,
    title: 'Worldwide cold-chain',
    text: 'Temperature-controlled, discreet shipping with tracking and an order number by email.',
  },
  {
    Icon: Calculator,
    title: 'Precision dosing tools',
    text: 'Built-in peptide calculator for exact reconstitution volumes and injection units.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                <span className="size-2 rounded-full bg-chart-3" />
                Next Genetics. Enhanced.
              </span>
              <h1 className="mt-6 text-pretty text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Elevating research through{' '}
                <span className="holo-text">pure precision.</span>
              </h1>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                GEN+ engineers ultra-high purity synthetic peptides for the modern
                researcher — validated by rigorous third-party analysis and built for
                precise, reproducible work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button render={<Link href="/catalog" />} size="lg" variant="gradient" nativeButton={false} className="rounded-full">
                  Go to catalog <ArrowRight className="size-4" />
                </Button>
                <Button render={<Link href="/calculator" />} size="lg" variant="outline" nativeButton={false} className="rounded-full">
                  Technical data
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-2xl">
                <Image
                  src="/peptide-hero.png"
                  alt="Collection of GEN+ research peptide vials on a holographic gradient"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-background/70 p-5 backdrop-blur">
                <dt className="text-3xl font-black tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Company info / features */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">The standard of purity</h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            GEN+ is a research-first peptide company. We pair pharmaceutical-grade
            sourcing with full batch transparency so labs can work with confidence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl holo-gradient">
                <Icon className="size-5 text-foreground" />
              </span>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Featured peptides</h2>
            <p className="mt-2 text-muted-foreground">Our most requested research compounds.</p>
          </div>
          <Button render={<Link href="/catalog" />} variant="ghost" nativeButton={false} className="hidden shrink-0 rounded-full sm:inline-flex">
            View all <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Bundles teaser */}
      <section className="mx-auto max-w-7xl px-4 py-12 pb-20 sm:px-6 lg:px-8 lg:py-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-border p-8 sm:p-12">
          <div className="absolute inset-0 holo-gradient opacity-40" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Save with research stacks
              </h2>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Pre-built bundles pairing complementary peptides with everything you
                need to reconstitute — at a lower price than buying separately.
              </p>
              <Button render={<Link href="/catalog#bundles" />} size="lg" variant="gradient" nativeButton={false} className="mt-6 rounded-full">
                Shop bundles <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start", loop: false }}>
                <CarouselContent>
                  {bundles.map((b) => (
                    <CarouselItem key={b.slug} className="basis-full sm:basis-1/2 lg:basis-1/3">
                      <Link
                        href="/catalog#bundles"
                        className="block overflow-hidden rounded-2xl border border-border bg-card"
                      >
                        <div className="relative aspect-square">
                          <Image src={b.image} alt={b.name} fill sizes="20vw" className="object-cover" />
                        </div>
                        <p className="p-3 text-sm font-semibold">{b.name}</p>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm" />
                <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

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
