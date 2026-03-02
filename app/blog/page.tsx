import { blogPosts } from "@/lib/blog"
import Link from "next/link"
import { ArrowRight, Clock, Tag } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — AI Tool Reviews, Comparisons & Guides",
  description:
    "Expert reviews, comparisons, and guides on the best AI tools for marketing, content creation, SEO, and more.",
  openGraph: {
    title: "Blog — AI Tool Reviews, Comparisons & Guides",
    description: "Expert AI tool reviews, comparisons, and guides.",
    type: "website",
  },
}

const categoryColors: Record<string, string> = {
  "AI Writing": "text-violet-400 bg-violet-500/10",
  Comparisons: "text-cyan-400 bg-cyan-500/10",
  "Make Money": "text-green-400 bg-green-500/10",
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Reviews &amp; Guides
        </h1>
        <p className="text-zinc-400">
          Honest analysis from our AI tool testing team — updated regularly.
        </p>
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-12">
        <article className="relative bg-gradient-to-br from-violet-950/40 to-zinc-900 border border-violet-700/30 hover:border-violet-500/50 rounded-2xl p-8 md:p-10 transition-all">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400">
              Featured
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[featured.category] ?? "text-zinc-400 bg-zinc-800"}`}
            >
              {featured.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-snug">
            {featured.title}
          </h2>
          <p className="text-zinc-400 mb-5 max-w-2xl leading-relaxed">{featured.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {featured.readTime}
            </span>
            <span>
              {new Date(featured.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-violet-400 font-medium">
              Read article <ArrowRight size={13} />
            </span>
          </div>
        </article>
      </Link>

      {/* Rest of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-xl p-6 h-full transition-all card-hover">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={13} className="text-zinc-500" />
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? "text-zinc-400 bg-zinc-800"}`}
                >
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.readTime}
                </span>
                <span>·</span>
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
