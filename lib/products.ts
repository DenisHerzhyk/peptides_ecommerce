export type Dosage = {
  label: string
  mg: number
  price: number
}

export type Product = {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  purity: string
  rating: number
  reviews: number
  image: string
  badge?: string
  dosages: Dosage[]
}

export type Bundle = {
  slug: string
  name: string
  tagline: string
  items: string[]
  price: number
  originalPrice: number
  image: string
}

export const categories = [
  'All',
  'Metabolic',
  'Recovery',
  'Longevity',
  'Cognitive',
  'Skin & Hair',
]

export const products: Product[] = [
  {
    slug: 'gen-glp-1',
    name: 'GLP-1 Research Peptide',
    category: 'Metabolic',
    tagline: 'Metabolic research compound',
    description:
      'A high-purity research peptide studied for its role in metabolic and glucose-regulation pathways. Supplied as a lyophilized powder for laboratory research use only.',
    purity: '99.4%',
    rating: 4.9,
    reviews: 218,
    image: '/peptide-vial-pink.png',
    badge: 'Bestseller',
    dosages: [
      { label: '5 mg', mg: 5, price: 89 },
      { label: '10 mg', mg: 10, price: 149 },
      { label: '15 mg', mg: 15, price: 199 },
    ],
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'Recovery',
    tagline: 'Tissue & recovery research',
    description:
      'A synthetic peptide fragment widely studied in recovery and connective-tissue research models. Third-party tested for identity and purity.',
    purity: '99.1%',
    rating: 4.8,
    reviews: 342,
    image: '/peptide-vial-blue.png',
    badge: 'Popular',
    dosages: [
      { label: '5 mg', mg: 5, price: 55 },
      { label: '10 mg', mg: 10, price: 95 },
    ],
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    category: 'Recovery',
    tagline: 'Actin-binding research peptide',
    description:
      'A synthetic version of the active region of Thymosin Beta-4, studied in tissue repair and flexibility research.',
    purity: '98.9%',
    rating: 4.7,
    reviews: 156,
    image: '/peptide-vial-green.png',
    dosages: [
      { label: '5 mg', mg: 5, price: 75 },
      { label: '10 mg', mg: 10, price: 135 },
    ],
  },
  {
    slug: 'nad-plus',
    name: 'NAD+ Research Compound',
    category: 'Longevity',
    tagline: 'Cellular energy research',
    description:
      'A coenzyme studied extensively in longevity and cellular-energy metabolism research. Lyophilized for stability.',
    purity: '99.0%',
    rating: 4.8,
    reviews: 201,
    image: '/peptide-vial-yellow.png',
    badge: 'New',
    dosages: [
      { label: '100 mg', mg: 100, price: 110 },
      { label: '500 mg', mg: 500, price: 320 },
    ],
  },
  {
    slug: 'semax',
    name: 'Semax',
    category: 'Cognitive',
    tagline: 'Neuropeptide research',
    description:
      'A heptapeptide studied for cognitive and neuroprotective research applications. High-purity, lab-grade.',
    purity: '98.7%',
    rating: 4.6,
    reviews: 98,
    image: '/peptide-vial-violet.png',
    dosages: [
      { label: '10 mg', mg: 10, price: 65 },
      { label: '30 mg', mg: 30, price: 165 },
    ],
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    category: 'Skin & Hair',
    tagline: 'Copper peptide research',
    description:
      'A naturally occurring copper-binding peptide studied in skin, collagen, and hair research models.',
    purity: '99.2%',
    rating: 4.9,
    reviews: 276,
    image: '/peptide-vial-teal.png',
    badge: 'Bestseller',
    dosages: [
      { label: '50 mg', mg: 50, price: 70 },
      { label: '100 mg', mg: 100, price: 125 },
    ],
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'Recovery',
    tagline: 'Selective research peptide',
    description:
      'A pentapeptide frequently used in growth-pathway and recovery research. Tested for purity and sequence accuracy.',
    purity: '99.3%',
    rating: 4.8,
    reviews: 187,
    image: '/peptide-vial-coral.png',
    dosages: [
      { label: '5 mg', mg: 5, price: 60 },
      { label: '10 mg', mg: 10, price: 105 },
    ],
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    category: 'Longevity',
    tagline: 'Mitochondrial research peptide',
    description:
      'A mitochondrial-derived peptide studied in metabolic and longevity research contexts.',
    purity: '98.8%',
    rating: 4.7,
    reviews: 121,
    image: '/peptide-vial-skyblue.png',
    dosages: [
      { label: '10 mg', mg: 10, price: 95 },
      { label: '20 mg', mg: 20, price: 170 },
    ],
  },
]

export const bundles: Bundle[] = [
  {
    slug: 'recovery-stack',
    name: 'Recovery Stack',
    tagline: 'BPC-157 + TB-500 research pair',
    items: ['BPC-157 (10mg)', 'TB-500 (10mg)', 'Bacteriostatic water'],
    price: 199,
    originalPrice: 250,
    image: '/peptide-bundle-recovery.png',
  },
  {
    slug: 'longevity-stack',
    name: 'Longevity Stack',
    tagline: 'NAD+ + MOTS-c research pair',
    items: ['NAD+ (500mg)', 'MOTS-c (20mg)', 'Bacteriostatic water'],
    price: 449,
    originalPrice: 520,
    image: '/peptide-bundle-longevity.png',
  },
  {
    slug: 'glow-stack',
    name: 'Glow Stack',
    tagline: 'GHK-Cu + Skin research kit',
    items: ['GHK-Cu (100mg)', 'Mixing kit', 'Bacteriostatic water'],
    price: 159,
    originalPrice: 190,
    image: '/peptide-bundle-glow.png',
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}
