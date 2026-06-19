import { notFound } from 'next/navigation'
import { products, getProduct } from '@/lib/products'
import { ProductDetail } from './product-detail'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product not found — HELIXA' }
  return {
    title: `${product.name} — HELIXA`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4)
  const filler = products.filter((p) => p.slug !== product.slug).slice(0, 4)
  const relatedList = (related.length ? related : filler).slice(0, 4)

  return <ProductDetail product={product} related={relatedList} />
}
