export interface Tool {
  slug: string
  name: string
  tagline: string
  description: string
  logo: string
  category: string
  pricing: {
    free: boolean
    startingAt: string
    plans: { name: string; price: string; features: string[] }[]
  }
  rating: number
  reviewCount: number
  pros: string[]
  cons: string[]
  affiliateUrl: string
  affiliateCommission: string
  websiteUrl: string
  features: string[]
  bestFor: string[]
  badge?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}
