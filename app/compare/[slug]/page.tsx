import { tools, getToolBySlug } from "@/lib/tools"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, X, ExternalLink, ArrowRight, ChevronRight, Star } from "lucide-react"
import type { Metadata } from "next"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const pairs: { slug: string }[] = []
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      pairs.push({ slug: `${tools[i].slug}-vs-${tools[j].slug}` })
    }
  }
  return pairs
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const [slug1, slug2] = slug.split("-vs-")
  const tool1 = getToolBySlug(slug1)
  const tool2 = getToolBySlug(slug2)
  if (!tool1 || !tool2) return {}
  return {
    title: `${tool1.name} vs ${tool2.name} (2026) — Which Is Better?`,
    description: `${tool1.name} vs ${tool2.name}: full comparison of features, pricing, pros & cons, and who each tool is best for. Updated 2026.`,
    openGraph: {
      title: `${tool1.name} vs ${tool2.name} — Full 2026 Comparison`,
      description: `Full comparison of ${tool1.name} and ${tool2.name} — features, pricing, pros & cons.`,
      type: "article",
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"}
        />
      ))}
    </div>
  )
}

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

export default async function ComparePage({ params }: { params: Params }) {
  const { slug } = await params
  const [slug1, slug2] = slug.split("-vs-")

  if (!slug1 || !slug2) notFound()

  const tool1 = getToolBySlug(slug1)
  const tool2 = getToolBySlug(slug2)

  if (!tool1 || !tool2) notFound()

  // Determine winner by rating
  const winner = tool1.rating >= tool2.rating ? tool1 : tool2

  // Features that both tools might share (union of all features)
  const allFeatureKeys = [
    "Free plan",
    "GPT-4 / LLM",
    "Brand Voice",
    "Templates",
    "API access",
    "Plagiarism checker",
    "SEO mode",
    "Team collaboration",
    "Mobile app",
    "Integrations",
  ]

  const featureCheck = (tool: typeof tool1, feat: string) => {
    const searchStr = [
      ...tool.features,
      tool.pricing.free ? "Free plan" : "",
      tool.features.join(" "),
    ]
      .join(" ")
      .toLowerCase()

    const keywords: Record<string, string[]> = {
      "Free plan": ["free"],
      "GPT-4 / LLM": ["gpt-4", "gpt", "ai", "llm", "chatgpt"],
      "Brand Voice": ["brand voice", "brand"],
      Templates: ["template"],
      "API access": ["api"],
      "Plagiarism checker": ["plagiarism"],
      "SEO mode": ["seo"],
      "Team collaboration": ["team", "collaborat", "workspace"],
      "Mobile app": ["mobile", "ios", "android", "app"],
      Integrations: ["integrat", "zapier", "chrome"],
    }

    return keywords[feat]?.some((kw) => searchStr.includes(kw)) ?? false
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-zinc-300">{tool1.name} vs {tool2.name}</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-sm text-violet-400 font-medium mb-3 uppercase tracking-wider">
          Head-to-Head Comparison
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          {tool1.name}{" "}
          <span className="text-zinc-600">vs</span>{" "}
          {tool2.name}
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          We compared both tools across pricing, features, output quality, and ease of use.
          Here&apos;s our honest verdict for 2026.
        </p>
      </div>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[tool1, tool2].map((tool) => (
          <div
            key={tool.slug}
            className={`bg-zinc-900 border rounded-xl p-5 md:p-6 text-center ${
              tool.slug === winner.slug
                ? "border-violet-500/50"
                : "border-zinc-800"
            }`}
          >
            {tool.slug === winner.slug && (
              <div className="text-xs font-semibold text-violet-300 bg-violet-500/20 px-2.5 py-1 rounded-full inline-block mb-3">
                ⭐ Our Pick
              </div>
            )}
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${logoColors[tool.logo] ?? "from-violet-500 to-cyan-500"} flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}
            >
              {tool.logo}
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-1">{tool.name}</h2>
            <p className="text-zinc-500 text-xs md:text-sm mb-3 line-clamp-2">{tool.tagline}</p>
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <StarRating rating={tool.rating} />
              <span className="text-white text-sm font-semibold">{tool.rating}</span>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              From{" "}
              <span className="text-white font-semibold">{tool.pricing.startingAt}</span>
            </p>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full justify-center"
            >
              Try {tool.name} <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* Quick Verdict */}
      <div className="bg-violet-950/30 border border-violet-700/30 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-white mb-3">⚡ Quick Verdict</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
          <div>
            <p className="text-violet-300 font-semibold mb-1">Choose {tool1.name} if…</p>
            <ul className="space-y-1 list-disc list-inside text-zinc-400">
              {tool1.bestFor.slice(0, 3).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-cyan-300 font-semibold mb-1">Choose {tool2.name} if…</p>
            <ul className="space-y-1 list-disc list-inside text-zinc-400">
              {tool2.bestFor.slice(0, 3).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ratings Comparison */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5">Ratings at a Glance</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {[
            { label: "Overall Rating", v1: tool1.rating, v2: tool2.rating, max: 5 },
            {
              label: "Review Count",
              v1: tool1.reviewCount,
              v2: tool2.reviewCount,
              max: Math.max(tool1.reviewCount, tool2.reviewCount),
              format: (v: number) => v.toLocaleString(),
            },
          ].map(({ label, v1, v2, max, format }, i) => (
            <div
              key={label}
              className={`px-5 py-4 ${i > 0 ? "border-t border-zinc-800" : ""}`}
            >
              <p className="text-xs text-zinc-500 mb-2">{label}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: tool1.name, val: v1 },
                  { name: tool2.name, val: v2 },
                ].map(({ name, val }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-zinc-400">{name}</span>
                      <span className="font-semibold text-white">
                        {format ? format(val) : val}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full">
                      <div
                        className="h-2 bg-violet-600 rounded-full"
                        style={{ width: `${(val / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5">Feature Comparison</h2>
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800/50">
                <th className="px-5 py-3 text-left text-sm font-semibold text-zinc-300">
                  Feature
                </th>
                <th className="px-5 py-3 text-center text-sm font-semibold text-white">
                  {tool1.name}
                </th>
                <th className="px-5 py-3 text-center text-sm font-semibold text-white">
                  {tool2.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {allFeatureKeys.map((feat, i) => {
                const has1 = featureCheck(tool1, feat)
                const has2 = featureCheck(tool2, feat)
                return (
                  <tr key={feat} className={i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/50"}>
                    <td className="px-5 py-3 text-sm text-zinc-300 border-t border-zinc-800">
                      {feat}
                    </td>
                    <td className="px-5 py-3 text-center border-t border-zinc-800">
                      {has1 ? (
                        <Check size={18} className="text-green-400 mx-auto" />
                      ) : (
                        <X size={18} className="text-zinc-600 mx-auto" />
                      )}
                    </td>
                    <td className="px-5 py-3 text-center border-t border-zinc-800">
                      {has2 ? (
                        <Check size={18} className="text-green-400 mx-auto" />
                      ) : (
                        <X size={18} className="text-zinc-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5">Pricing Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[tool1, tool2].map((tool) => (
            <div
              key={tool.slug}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                {tool.name}
                {tool.pricing.free && (
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Free plan
                  </span>
                )}
              </h3>
              <div className="space-y-2">
                {tool.pricing.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-400">{plan.name}</span>
                    <span className="font-semibold text-white">{plan.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pros/Cons Side-by-Side */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5">Pros &amp; Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[tool1, tool2].map((tool) => (
            <div key={tool.slug} className="space-y-4">
              <h3 className="font-semibold text-white">{tool.name}</h3>
              <div className="bg-green-950/20 border border-green-700/20 rounded-xl p-4">
                <p className="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wider">
                  Pros
                </p>
                <ul className="space-y-2">
                  {tool.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check size={14} className="text-green-400 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-950/20 border border-red-700/20 rounded-xl p-4">
                <p className="text-xs text-red-400 font-semibold mb-2 uppercase tracking-wider">
                  Cons
                </p>
                <ul className="space-y-2">
                  {tool.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-zinc-300">
                      <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Verdict */}
      <section className="mb-10 bg-gradient-to-br from-violet-950/50 to-zinc-900 border border-violet-700/30 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-3">
          🏆 Our Verdict: {winner.name} Wins
        </h2>
        <p className="text-zinc-300 mb-5 leading-relaxed">
          With a rating of {winner.rating}/5 and {winner.reviewCount.toLocaleString()} reviews,{" "}
          <strong className="text-white">{winner.name}</strong> edges ahead on overall quality
          and user satisfaction. That said, both tools are excellent — the right choice depends
          on your specific workflow and budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={winner.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Try {winner.name} <ExternalLink size={17} />
          </a>
          <Link
            href={`/tools/${winner.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-colors"
          >
            Full {winner.name} Review <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Individual Review Links */}
      <div className="grid grid-cols-2 gap-4">
        {[tool1, tool2].map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/40 rounded-xl p-4 flex items-center justify-between text-sm transition-all group"
          >
            <span className="text-zinc-300 group-hover:text-white">
              Full {tool.name} Review
            </span>
            <ArrowRight size={16} className="text-zinc-500 group-hover:text-violet-400" />
          </Link>
        ))}
      </div>
    </main>
  )
}
