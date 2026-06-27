import { CatalogClient } from './catalog-client'

export const metadata = {
  title: 'Catalog — GEN+',
  description: 'Browse lab-verified research peptides, bundles and stacks.',
}

export default function CatalogPage() {
  return <CatalogClient />
}
