import { blogPosts, getPostBySlug } from "@/lib/blog"
import { tools } from "@/lib/tools"
import { markdownToHtml } from "@/lib/markdown"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Tag, ArrowRight, ExternalLink, Star, Zap } from "lucide-react"
import type { Metadata } from "next"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

const categoryColors: Record<string, string> = {
  "AI Writing": "text-violet-400 bg-violet-500/10",
  Comparisons: "text-cyan-400 bg-cyan-500/10",
  "Make Money": "text-green-400 bg-green-500/10",
  "AI Video": "text-pink-400 bg-pink-500/10",
  "SEO Tools": "text-blue-400 bg-blue-500/10",
  "AI Design": "text-yellow-400 bg-yellow-500/10",
  "AI Productivity": "text-teal-400 bg-teal-500/10",
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
  MU: "from-purple-500 to-violet-500",
  IV: "from-blue-500 to-indigo-500",
  GA: "from-orange-400 to-pink-500",
  PX: "from-teal-500 to-cyan-500",
  LO: "from-violet-600 to-purple-600",
  FR: "from-green-500 to-teal-500",
}

// Map post categories to tool categories
const categoryToolMap: Record<string, string> = {
  "AI Writing": "AI Writing",
  "Comparisons": "AI Writing",
  "SEO Tools": "SEO Tools",
  "AI Video": "AI Video",
  "AI Design": "AI Design",
  "AI Productivity": "AI Productivity",
  "Make Money": "AI Writing",
}

function getRelatedTools(postCategory: string, postSlug: string, count = 3) {
  const toolCategory = categoryToolMap[postCategory] ?? "AI Writing"

  // Try to find tools mentioned in the slug
  const slugWords = postSlug.split("-")
  const mentionedTools = tools.filter((t) =>
    slugWords.some((w) => t.slug.includes(w) && w.length > 3)
  )

  const categoryTools = tools
    .filter((t) => t.category === toolCategory)
    .sort((a, b) => b.rating - a.rating)

  // Merge: mentioned tools first, then top-rated category tools, deduplicated
  const merged = [
    ...mentionedTools,
    ...categoryTools.filter((t) => !mentionedTools.find((m) => m.slug === t.slug)),
  ]

  return merged.slice(0, count)
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const htmlContent = markdownToHtml(post.content)
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const relatedTools = getRelatedTools(post.category, slug)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolsreview.com"

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "AI Tools Review", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "AI Tools Review",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.ico` },
    },
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      {/* Header */}
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Tag size={14} className="text-zinc-500" />
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                categoryColors[post.category] ?? "text-zinc-400 bg-zinc-800"
              }`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-5">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
            <span>·</span>
            <span>AI Tools Review Team</span>
          </div>
        </header>

        {/* Article Body */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Mid-article CTA banner */}
        {relatedTools[0] && (
          <div className="my-10 bg-violet-950/40 border border-violet-700/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-violet-400" />
                <span className="text-sm font-semibold text-violet-300">Our Top Pick</span>
              </div>
              <p className="text-white font-semibold mb-0.5">{relatedTools[0].name}</p>
              <p className="text-zinc-400 text-sm">{relatedTools[0].tagline}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={relatedTools[0].affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Try Free <ExternalLink size={13} />
              </a>
              <Link
                href={`/tools/${relatedTools[0].slug}`}
                className="inline-flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm px-4 py-2.5 rounded-xl transition-colors"
              >
                Review <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* Affiliate Disclaimer */}
        <div className="mt-10 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500">
          <strong className="text-zinc-400">Disclosure:</strong> This article contains affiliate
          links. If you purchase through our links, we may earn a commission at no extra cost to
          you. We only recommend tools we genuinely believe in.
        </div>
      </article>

      {/* Related Tools CTAs */}
      {relatedTools.length > 0 && (
        <section className="mt-12 pt-10 border-t border-zinc-800">
          <h2 className="text-lg font-bold text-white mb-5">
            Top Picks from This Article
          </h2>
          <div className="space-y-3">
            {relatedTools.map((tool, i) => {
              const gradient = logoColors[tool.logo] ?? "from-violet-500 to-cyan-500"
              return (
                <div
                  key={tool.slug}
                  className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-4 flex items-center gap-4 transition-all"
                >
                  {/* Rank */}
                  <span className="text-zinc-600 font-bold text-sm w-4 shrink-0">
                    #{i + 1}
                  </span>

                  {/* Logo */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                  >
                    {tool.logo}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-white text-sm">{tool.name}</span>
                      {tool.badge && (
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs truncate">{tool.tagline}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-white">{tool.rating}</span>
                  </div>

                  {/* Pricing */}
                  <span className="text-xs text-zinc-400 shrink-0 hidden sm:block">
                    {tool.pricing.free ? "Free plan" : `From ${tool.pricing.startingAt}`}
                  </span>

                  {/* CTAs */}
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-1 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Try <ExternalLink size={11} />
                    </a>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-xs px-3 py-2 rounded-lg transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Deals CTA */}
          <Link
            href="/deals"
            className="mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-3 text-sm text-zinc-400 hover:text-white transition-all"
          >
            🔥 See all current deals &amp; discounts <ArrowRight size={14} />
          </Link>
        </section>
      )}

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="mt-12 pt-10 border-t border-zinc-800">
          <h2 className="text-lg font-bold text-white mb-5">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <article className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-5 h-full transition-all card-hover">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryColors[p.category] ?? "text-zinc-400 bg-zinc-800"
                    }`}
                  >
                    {p.category}
                  </span>
                  <h3 className="text-base font-semibold text-white mt-3 mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-violet-400 mt-3">
                    Read article <ArrowRight size={12} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
