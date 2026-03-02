import { blogPosts, getPostBySlug } from "@/lib/blog"
import { markdownToHtml } from "@/lib/markdown"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react"
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
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const htmlContent = markdownToHtml(post.content)
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
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

        {/* Affiliate Disclaimer */}
        <div className="mt-10 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500">
          <strong className="text-zinc-400">Disclosure:</strong> This article contains affiliate
          links. If you purchase through our links, we may earn a commission at no extra cost to
          you. We only recommend tools we genuinely believe in.
        </div>
      </article>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="mt-14 pt-10 border-t border-zinc-800">
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
