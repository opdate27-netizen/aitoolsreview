import { tools, getToolBySlug } from "@/lib/tools"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Check,
  X,
  Star,
  ExternalLink,
  ChevronRight,
  Zap,
} from "lucide-react"
import type { Metadata } from "next"
import ToolCard from "@/components/ui/ToolCard"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: `${tool.name} Review 2026 — Is It Worth It?`,
    description: `${tool.tagline}. Read our full ${tool.name} review covering pricing, pros & cons, features, and who it's best for.`,
    openGraph: {
      title: `${tool.name} Review 2026`,
      description: tool.tagline,
      type: "article",
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"}
        />
      ))}
    </div>
  )
}

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3)

  const logoColors: Record<string, string> = {
    J: "from-orange-500 to-pink-500",
    S: "from-blue-500 to-cyan-500",
    W: "from-green-500 to-teal-500",
    C: "from-violet-500 to-purple-500",
    P: "from-red-500 to-orange-500",
    SY: "from-indigo-500 to-blue-500",
    D: "from-pink-500 to-rose-500",
    CA: "from-cyan-500 to-blue-500",
    G: "from-green-400 to-emerald-500",
    H: "from-violet-600 to-indigo-600",
  }
  const gradient = logoColors[tool.logo] ?? "from-violet-500 to-cyan-500"

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolsreview.com"

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${tool.name} Review`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: "AI Tools Review" },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.tagline,
      applicationCategory: tool.category,
      offers: {
        "@type": "Offer",
        price: tool.pricing.free ? "0" : tool.pricing.startingAt.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
      },
    },
    url: `${siteUrl}/tools/${tool.slug}`,
    description: tool.description,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${siteUrl}/tools/${tool.slug}` },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/tools" className="hover:text-zinc-300 transition-colors">Tools</Link>
        <ChevronRight size={14} />
        <span className="text-zinc-300">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl shrink-0`}
        >
          {tool.logo}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tool.badge && (
              <span className="text-xs font-semibold bg-violet-600 text-white px-2.5 py-1 rounded-full">
                {tool.badge}
              </span>
            )}
            <span className="text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full">
              {tool.category}
            </span>
            {tool.pricing.free && (
              <span className="text-xs text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
                Free plan available
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{tool.name}</h1>
          <p className="text-zinc-400 text-lg mb-3">{tool.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <StarRating rating={tool.rating} />
              <span className="font-semibold text-white">{tool.rating}</span>
              <span className="text-zinc-500">({tool.reviewCount.toLocaleString()} reviews)</span>
            </div>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400">
              Starting at{" "}
              <span className="text-white font-semibold">{tool.pricing.startingAt}</span>
            </span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
        >
          Try {tool.name} <ExternalLink size={17} />
        </a>
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-colors"
        >
          Visit Website <ArrowRight size={17} />
        </a>
        <div className="flex items-center justify-center gap-1 text-xs text-zinc-500 sm:ml-2 shrink-0">
          <Zap size={12} className="text-violet-400" />
          <span>{tool.affiliateCommission} commission</span>
        </div>
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
        <p className="text-zinc-300 leading-relaxed text-lg">{tool.description}</p>
      </section>

      {/* Pros & Cons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-950/20 border border-green-700/30 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Check size={20} className="text-green-400" /> Pros
          </h2>
          <ul className="space-y-3">
            {tool.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2.5 text-zinc-300">
                <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-950/20 border border-red-700/30 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <X size={20} className="text-red-400" /> Cons
          </h2>
          <ul className="space-y-3">
            {tool.cons.map((con) => (
              <li key={con} className="flex items-start gap-2.5 text-zinc-300">
                <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tool.features.map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300"
            >
              <Check size={15} className="text-violet-400 shrink-0" />
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tool.pricing.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-5 ${
                i === 1
                  ? "border-violet-500/50 bg-violet-950/30"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {i === 1 && (
                <span className="text-xs font-semibold text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full mb-3 inline-block">
                  Most Popular
                </span>
              )}
              <div className="text-lg font-bold text-white mb-0.5">{plan.name}</div>
              <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check size={14} className="text-green-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Best For */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Best For</h2>
        <div className="flex flex-wrap gap-3">
          {tool.bestFor.map((b) => (
            <span
              key={b}
              className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full text-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mb-14 bg-gradient-to-br from-violet-950/50 to-zinc-900 border border-violet-700/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Ready to try {tool.name}?</h2>
        <p className="text-zinc-400 mb-6">
          {tool.pricing.free
            ? "Start with the free plan — no credit card required."
            : `Plans start at ${tool.pricing.startingAt}. Most come with a money-back guarantee.`}
        </p>
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
        >
          Get Started with {tool.name} <ExternalLink size={18} />
        </a>
        <p className="text-xs text-zinc-600 mt-4">
          * Affiliate link — we may earn a commission at no extra cost to you.
        </p>
      </section>

      {/* Compare CTA */}
      {relatedTools.length > 0 && (
        <div className="mb-10 p-5 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-white">Compare with alternatives</p>
            <p className="text-sm text-zinc-400">
              See how {tool.name} stacks up against the competition.
            </p>
          </div>
          {relatedTools[0] && (
            <Link
              href={`/compare/${tool.slug}-vs-${relatedTools[0].slug}`}
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
            >
              {tool.name} vs {relatedTools[0].name} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-5">
            Other {tool.category} Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
