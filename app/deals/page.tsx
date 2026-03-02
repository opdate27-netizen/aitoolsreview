import { tools } from "@/lib/tools"
import Link from "next/link"
import { ExternalLink, Tag, Clock, Zap, ArrowRight, Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best AI Tool Deals & Discounts 2026 — Coupons & Free Trials",
  description:
    "The best AI tool deals, discounts, and free trials available right now. Updated daily — save on Jasper, Surfer SEO, Writesonic, Canva Pro, and more.",
  keywords:
    "AI tool deals, Jasper discount, Surfer SEO coupon, Writesonic promo, Canva Pro deal, AI tools free trial 2026",
  openGraph: {
    title: "Best AI Tool Deals & Discounts 2026",
    description: "Coupons, free trials, and discounts on the best AI tools — updated regularly.",
    type: "website",
  },
}

const deals = [
  {
    slug: "jasper-ai",
    discount: "7-Day Free Trial",
    badge: "🔥 Popular",
    badgeColor: "text-orange-400 bg-orange-500/10",
    detail: "Try all Pro features free for 7 days — no credit card required.",
    expires: "Limited time",
    cta: "Start Free Trial",
  },
  {
    slug: "writesonic",
    discount: "Free Plan Available",
    badge: "✅ Always Free",
    badgeColor: "text-green-400 bg-green-500/10",
    detail: "Get 10,000 words/month free forever. No credit card needed.",
    expires: "Ongoing",
    cta: "Get Free Plan",
  },
  {
    slug: "surfer-seo",
    discount: "7-Day Money-Back",
    badge: "💰 Risk-Free",
    badgeColor: "text-yellow-400 bg-yellow-500/10",
    detail: "Try Surfer SEO with a 7-day money-back guarantee on all plans.",
    expires: "Ongoing",
    cta: "Try Risk-Free",
  },
  {
    slug: "hostinger",
    discount: "Up to 75% Off",
    badge: "🏆 Best Value",
    badgeColor: "text-violet-400 bg-violet-500/10",
    detail: "Plans from $2.99/month — includes free domain and SSL certificate.",
    expires: "Limited time",
    cta: "Claim Discount",
  },
  {
    slug: "canva-pro",
    discount: "30-Day Free Trial",
    badge: "🎨 Top Pick",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
    detail: "Get 30 days of Canva Pro free — full access to all premium features.",
    expires: "Ongoing",
    cta: "Start Free Trial",
  },
  {
    slug: "grammarly",
    discount: "Free Plan + 20% Off Premium",
    badge: "✍️ Editor's Choice",
    badgeColor: "text-green-400 bg-green-500/10",
    detail: "Start free, upgrade to Premium for style rewrites and plagiarism checking.",
    expires: "Ongoing",
    cta: "Get Grammarly Free",
  },
  {
    slug: "copy-ai",
    discount: "Free Forever Plan",
    badge: "✅ Always Free",
    badgeColor: "text-green-400 bg-green-500/10",
    detail: "2,000 words/month and 90+ AI tools — completely free, no expiry.",
    expires: "Ongoing",
    cta: "Get Free Plan",
  },
  {
    slug: "descript",
    discount: "Free Plan Available",
    badge: "🎬 Best Editor",
    badgeColor: "text-pink-400 bg-pink-500/10",
    detail: "Edit video by editing text — free plan includes 1 transcription hour/month.",
    expires: "Ongoing",
    cta: "Start Free",
  },
  {
    slug: "synthesia",
    discount: "Free Demo Video",
    badge: "🤖 AI Avatars",
    badgeColor: "text-indigo-400 bg-indigo-500/10",
    detail: "Create one free AI avatar video to test the platform before committing.",
    expires: "Ongoing",
    cta: "Create Free Video",
  },
  {
    slug: "runway-ml",
    discount: "125 Free Credits",
    badge: "🎥 Most Advanced",
    badgeColor: "text-violet-400 bg-violet-500/10",
    detail: "Sign up free and get 125 credits to generate AI videos with Gen-3.",
    expires: "Ongoing",
    cta: "Get Free Credits",
  },
  {
    slug: "elevenlabs",
    discount: "Free Plan — 10k Chars/Month",
    badge: "🎙️ Best Voice",
    badgeColor: "text-blue-400 bg-blue-500/10",
    detail: "Generate realistic AI voices free — includes voice cloning on paid plans.",
    expires: "Ongoing",
    cta: "Try Free",
  },
  {
    slug: "midjourney",
    discount: "From $10/Month",
    badge: "🖼️ Best Quality",
    badgeColor: "text-yellow-400 bg-yellow-500/10",
    detail: "Generate ~200 stunning AI images/month for just $10. No free plan, but best quality.",
    expires: "Ongoing",
    cta: "Get Started",
  },
]

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
  GP: "from-emerald-500 to-teal-500",
  CL: "from-amber-500 to-orange-500",
  NO: "from-gray-500 to-zinc-500",
  RY: "from-blue-500 to-violet-500",
  AH: "from-orange-500 to-red-500",
  SM: "from-orange-400 to-yellow-500",
  RW: "from-red-500 to-pink-500",
  HG: "from-violet-500 to-blue-500",
  MJ: "from-blue-600 to-indigo-600",
  EL: "from-blue-400 to-cyan-500",
  AF: "from-red-500 to-orange-400",
  OT: "from-teal-500 to-green-500",
  DL: "from-indigo-500 to-blue-400",
}

export default function DealsPage() {
  const dealTools = deals
    .map((d) => ({ ...d, tool: tools.find((t) => t.slug === d.slug) }))
    .filter((d) => d.tool)

  const freeDeals = dealTools.filter((d) =>
    d.discount.toLowerCase().includes("free")
  )
  const paidDeals = dealTools.filter(
    (d) => !d.discount.toLowerCase().includes("free")
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-5">
          <Zap size={14} className="text-orange-400" />
          Updated March 2026 — All deals verified
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Best AI Tool Deals &amp; Discounts
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg">
          Free trials, coupons, and the lowest prices on the best AI tools.
          We verify every deal before listing it.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: `${dealTools.length}`, label: "Active Deals" },
          { value: `${freeDeals.length}`, label: "Free Plans" },
          { value: "Daily", label: "Updated" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Free Plans Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Tag size={18} className="text-green-400" />
          <h2 className="text-xl font-bold text-white">Free Plans &amp; Trials</h2>
          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
            {freeDeals.length} deals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freeDeals.map(({ tool, discount, badge, badgeColor, detail, cta }) => {
            if (!tool) return null
            const gradient = logoColors[tool.logo] ?? "from-violet-500 to-cyan-500"
            return (
              <div
                key={tool.slug}
                className="bg-zinc-900 border border-zinc-800 hover:border-green-500/30 rounded-xl p-5 transition-all card-hover"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {tool.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white">{tool.name}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="text-green-400 font-semibold text-sm mb-1">{discount}</p>
                    <p className="text-zinc-400 text-sm mb-3">{detail}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        {cta} <ExternalLink size={13} />
                      </a>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                      >
                        Full review <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-amber-400 justify-end">
                      <Star size={13} className="fill-amber-400" />
                      <span className="text-sm font-semibold text-white">{tool.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Paid Deals Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Tag size={18} className="text-violet-400" />
          <h2 className="text-xl font-bold text-white">Discounts &amp; Best Prices</h2>
          <span className="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full">
            {paidDeals.length} deals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paidDeals.map(({ tool, discount, badge, badgeColor, detail, expires, cta }) => {
            if (!tool) return null
            const gradient = logoColors[tool.logo] ?? "from-violet-500 to-cyan-500"
            return (
              <div
                key={tool.slug}
                className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-5 transition-all card-hover"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {tool.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white">{tool.name}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="text-violet-400 font-semibold text-sm mb-1">{discount}</p>
                    <p className="text-zinc-400 text-sm mb-2">{detail}</p>
                    <div className="flex items-center gap-1 text-xs text-zinc-600 mb-3">
                      <Clock size={11} />
                      <span>{expires}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        {cta} <ExternalLink size={13} />
                      </a>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                      >
                        Full review <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-amber-400 justify-end">
                      <Star size={13} className="fill-amber-400" />
                      <span className="text-sm font-semibold text-white">{tool.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500 text-center">
        <strong className="text-zinc-400">Affiliate Disclosure:</strong> Some links on this page are affiliate links.
        We may earn a commission if you purchase through them — at no extra cost to you.
        We only list tools we genuinely recommend.
      </div>
    </main>
  )
}
