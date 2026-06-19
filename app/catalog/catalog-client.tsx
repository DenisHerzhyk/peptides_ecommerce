'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products, bundles, categories } from '@/lib/products'
import { useCart } from '@/components/cart-store'

export function CatalogClient() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const { addItem } = useCart()

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [query, category])

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-pretty text-4xl font-black tracking-tight sm:text-5xl">
            Peptide <span className="holo-text">catalog</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Lab-verified research peptides and bundles. All products supplied for
            research use only.
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peptides, categories..."
              className="w-full rounded-full border border-border bg-background/80 py-3.5 pl-12 pr-4 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                category === c
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No peptides match your search.
          </p>
        )}
      </section>

      {/* Bundles */}
      <section id="bundles" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Bundles &amp; stacks</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Complementary peptides paired together at a discount.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {bundles.map((b) => (
            <div key={b.slug} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative aspect-[4/3]">
                <Image src={b.image} alt={b.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-bold backdrop-blur">
                  Save ${b.originalPrice - b.price}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{b.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.tagline}</p>
                <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-chart-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black">${b.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${b.originalPrice}</span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      addItem({
                        id: `bundle-${b.slug}`,
                        name: b.name,
                        variant: 'Bundle',
                        price: b.price,
                        image: b.image,
                      })
                    }
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
