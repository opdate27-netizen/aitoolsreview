import { tools } from "@/lib/tools"
import { blogPosts } from "@/lib/blog"
import ToolCard from "@/components/ui/ToolCard"
import ComparisonPicker from "@/components/ComparisonPicker"
import Link from "next/link"
import { ArrowRight, Star, Shield, TrendingUp, Zap } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best AI Tools Reviews 2026 — Honest, Independent Rankings",
  description:
    "We test and review the best AI tools for writing, SEO, video, and design. Find the right AI tool for your business with our honest, independent reviews.",
  keywords:
    "AI tools, AI writing tools, AI video tools, AI design tools, SEO tools, Jasper AI review, Writesonic review, Canva Pro review",
  openGraph: {
    title: "Best AI Tools Reviews 2026 — Honest, Independent Rankings",
    description:
      "Tested and ranked: the best AI tools for writing, SEO, video, and design. Updated 2026.",
    type: "website",
    url: "https://aitoolsreview.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools Reviews 2026",
    description: "Honest, independent reviews of the best AI tools for your business.",
  },
}

const categoryIcons: Record<string, string> = {
  "AI Writing": "✍️",
  "SEO Tools": "📈",
  "AI Video": "🎬",
  "AI Design": "🎨",
  "Web Hosting": "🌐",
}

export default function HomePage() {
  const featuredTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const allCategories = [...new Set(tools.map((t) => t.category))]

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/8 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-8">
            <Zap size={14} className="text-violet-400" />
            10 tools tested &amp; ranked — Updated March 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Find the Best{" "}
            <span className="gradient-text">AI Tools</span>
            <br />
            for Your Business
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Honest, independent reviews of the AI tools actually worth paying for.
            We test everything — so you can decide with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Browse All Tools <ArrowRight size={20} />
            </Link>
            <Link
              href="/free-guide"
              className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Get Free Guide
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto border-t border-zinc-800 pt-10">
            {[
              { value: "10+", label: "Tools Reviewed" },
              { value: "30M+", label: "Users Covered" },
              { value: "2026", label: "Last Updated" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
                <div className="text-sm text-zinc-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tools ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Top-Rated AI Tools</h2>
            <p className="text-zinc-400 mt-1">Ranked by rating from our verified reviews</p>
          </div>
          <Link
            href="/tools"
            className="text-violet-400 hover:text-violet-300 flex items-center gap-1 text-sm font-medium shrink-0 mt-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── Comparison Picker ── */}
      <section className="py-6 max-w-6xl mx-auto px-4">
        <ComparisonPicker />
      </section>

      {/* ── Browse by Category ── */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Browse by Category
          </h2>
          <p className="text-zinc-400 text-center mb-10">
            Find the right AI tool for your specific workflow
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allCategories.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length
              return (
                <Link
                  key={cat}
                  href={`/tools?category=${encodeURIComponent(cat)}`}
                  className="flex flex-col items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/40 rounded-xl p-6 text-center transition-all group card-hover"
                >
                  <span className="text-3xl">{categoryIcons[cat] ?? "🤖"}</span>
                  <span className="font-medium text-zinc-200 group-hover:text-white transition-colors text-sm">
                    {cat}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {count} {count === 1 ? "tool" : "tools"}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Blog Posts ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Latest Reviews &amp; Guides
            </h2>
            <p className="text-zinc-400 mt-1">Expert analysis from our testing team</p>
          </div>
          <Link
            href="/blog"
            className="text-violet-400 hover:text-violet-300 flex items-center gap-1 text-sm font-medium shrink-0 mt-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-6 h-full transition-all card-hover">
                <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-4 mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Email CTA Banner ── */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-violet-950/60 to-zinc-900 border border-violet-700/30 rounded-2xl p-10 md:p-14">
            <Shield size={44} className="text-violet-400 mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              The 10 Best AI Tools for 2026 — Free Guide
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Our guide covers every top AI tool with pricing breakdowns, pros/cons, and our
              honest verdict. No fluff. Free for subscribers.
            </p>
            <Link
              href="/free-guide"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Get Free Guide <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="py-14 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Star className="text-yellow-400 mx-auto" size={30} />,
                title: "Tested Hands-On",
                body: "Every tool is personally tested by our team before we write a single word.",
              },
              {
                icon: <Shield className="text-green-400 mx-auto" size={30} />,
                title: "Honest Reviews",
                body: "We list the cons even for tools we recommend. No sponsored rankings, ever.",
              },
              {
                icon: <TrendingUp className="text-violet-400 mx-auto" size={30} />,
                title: "Always Updated",
                body: "Pricing and features change fast. We revisit every review when tools update.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                {icon}
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
