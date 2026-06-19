import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const from = Math.min(...product.dosages.map((d) => d.price))
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute left-3 top-3 rounded-full border-0 bg-background/85 text-foreground backdrop-blur">
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{product.category}</span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <Star className="size-3.5 fill-chart-4 text-chart-4" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-1.5 text-base font-bold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-muted-foreground">from</span>
            <p className="text-lg font-black">${from}</p>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            View
          </span>
        </div>
      </div>
    </Link>
  )
}
