'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShieldCheck, Truck, FlaskConical, Check, Minus, Plus, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/components/cart-store'
import type { Product } from '@/lib/products'
import { bundles } from '@/lib/products'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [dosageIndex, setDosageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const dosage = product.dosages[dosageIndex]

  function handleAdd() {
    addItem(
      {
        id: `${product.slug}-${dosage.label}`,
        name: product.name,
        variant: dosage.label,
        price: dosage.price,
        image: product.image,
      },
      qty,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/catalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to catalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-secondary">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <Badge className="absolute left-4 top-4 rounded-full border-0 bg-background/85 text-foreground backdrop-blur">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
          <h1 className="mt-1 text-pretty text-3xl font-black tracking-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-chart-4 text-chart-4" />
              {product.rating}
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-chart-3">
              <FlaskConical className="size-4" /> {product.purity} purity
            </span>
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Dosage selection */}
          <div className="mt-7">
            <p className="text-sm font-semibold">Select dosage</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.dosages.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setDosageIndex(i)}
                  className={cn(
                    'flex min-w-20 flex-col items-center rounded-2xl border px-4 py-2.5 transition-colors',
                    i === dosageIndex
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50',
                  )}
                >
                  <span className="text-sm font-bold">{d.label}</span>
                  <span className="text-xs text-muted-foreground">${d.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + price */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex size-10 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <span className="text-3xl font-black">${dosage.price * qty}</span>
          </div>

          <Button onClick={handleAdd} size="lg" variant="gradient" className="mt-6 w-full rounded-full sm:w-auto">
            {added ? (
              <>
                <Check className="size-4" /> Added to cart
              </>
            ) : (
              'Add to cart'
            )}
          </Button>

          {/* Trust row */}
          <div className="mt-7 grid grid-cols-3 gap-2 border-t border-border pt-6 sm:gap-3">
            {[
              { Icon: ShieldCheck, label: 'Batch-tested COA' },
              { Icon: Truck, label: 'Ships in 24h' },
              { Icon: FlaskConical, label: 'Research grade' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="size-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details accordion */}
      <div className="mt-14 max-w-3xl">
        <Accordion type="single" collapsible defaultValue="specs">
          <AccordionItem value="specs">
            <AccordionTrigger>Specifications</AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li>Form: Lyophilized powder</li>
                <li>Purity: {product.purity}</li>
                <li>Category: {product.category}</li>
                <li>Storage: -20°C, protect from light</li>
                <li>Testing: HPLC &amp; mass spectrometry</li>
                <li>Available sizes: {product.dosages.map((d) => d.label).join(', ')}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reconstitution">
            <AccordionTrigger>Reconstitution &amp; dosing</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Reconstitute with bacteriostatic water before use. For exact volumes
                and per-injection units based on your target dose, use our{' '}
                <Link href="/calculator" className="font-medium text-primary underline-offset-2 hover:underline">
                  peptide calculator
                </Link>
                .
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="disclaimer">
            <AccordionTrigger>Research use disclaimer</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This product is sold strictly for in-vitro laboratory research and
                development use only. It is not intended for human or veterinary use,
                diagnostic, or therapeutic purposes.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-black tracking-tight">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Bundles & stacks containing this product */}
      <BundlesCarousel product={product} />

      {/* Research use disclaimer */}
      <section id="disclaimer" className="mx-auto mt-16 max-w-5xl scroll-mt-20">
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
    </div>
  )
}

function BundlesCarousel({ product }: { product: Product }) {
  const productBundles = bundles.filter((b) =>
    b.items.some((item) => item.startsWith(product.name.split(' ')[0])),
  )

  if (productBundles.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-black tracking-tight">Bundles &amp; stacks</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.name} is featured in these research stacks — save when you bundle.
      </p>
      <div className="relative mt-6 min-w-0 overflow-hidden">
        <Carousel opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {productBundles.map((b) => (
              <CarouselItem key={b.slug} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <Link
                  href="/catalog#bundles"
                  className="block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:bg-secondary/50"
                >
                  <div className="relative aspect-4/3">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-bold">{b.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{b.tagline}</p>
                    <p className="mt-2 text-sm">
                      <span className="font-bold text-foreground">${b.price}</span>{' '}
                      <span className="text-muted-foreground line-through">${b.originalPrice}</span>
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm" />
          <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm" />
        </Carousel>
      </div>
    </div>
  )
}
