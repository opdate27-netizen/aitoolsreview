"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  ArrowLeft,
  Shield,
  Zap,
  Star,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react"

const GUIDE_TOPICS = [
  "The 10 best AI tools of 2026, ranked and rated",
  "Side-by-side pricing breakdown for every tool",
  "Which tools have genuinely useful free plans",
  "Our honest pros & cons for each tool",
  "Best tool by use case: writing, SEO, video, design",
  "How to stack tools to build a $0/day content engine",
  "Affiliate commissions if you want to promote AI tools",
  "Our #1 recommendation for beginners",
]

const TESTIMONIALS = [
  {
    quote:
      "This saved me hours of research. I went from overwhelmed to having a clear AI stack in an afternoon.",
    author: "Sarah K.",
    role: "Freelance content writer",
  },
  {
    quote:
      "Switched from Jasper to Writesonic based on their recommendation and cut my tool bill in half.",
    author: "Marcus T.",
    role: "E-commerce brand owner",
  },
  {
    quote: "The affiliate section alone was worth the signup. Already making $800/mo from referrals.",
    author: "Priya M.",
    role: "Blogger & affiliate marketer",
  },
]

export default function FreeGuidePage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-10"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — Value prop */}
        <div>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
            <BookOpen size={14} />
            Free 30-page guide — Updated 2026
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            The Complete AI Tools Guide for{" "}
            <span className="gradient-text">2026</span>
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            We spent 200+ hours testing AI tools so you don&apos;t have to. Get our full
            breakdown — free — just for subscribing.
          </p>

          {/* What's inside */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap size={18} className="text-violet-400" />
              What&apos;s Inside
            </h2>
            <ul className="space-y-3">
              {GUIDE_TOPICS.map((topic) => (
                <li key={topic} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                  <Check size={15} className="text-green-400 shrink-0 mt-0.5" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Star size={20} className="text-yellow-400" />, value: "10+", label: "Tools Reviewed" },
              { icon: <Users size={20} className="text-violet-400" />, value: "2,400+", label: "Subscribers" },
              { icon: <TrendingUp size={20} className="text-green-400" />, value: "Free", label: "No credit card" },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-1">{icon}</div>
                <div className="text-lg font-bold text-white">{value}</div>
                <div className="text-xs text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="sticky top-24">
          <div className="bg-gradient-to-br from-violet-950/50 to-zinc-900 border border-violet-700/30 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-2">You&apos;re in!</h2>
                <p className="text-zinc-400 mb-6">
                  Check your inbox — we&apos;ve sent the guide. If you don&apos;t see it in 5
                  minutes, check spam.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Browse All AI Tools
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-1">
                  Get the Free Guide
                </h2>
                <p className="text-zinc-400 text-sm mb-6">
                  No spam, ever. Unsubscribe anytime.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-zinc-300 mb-1.5">
                      Your email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
                  >
                    {loading ? "Sending…" : "Send Me the Free Guide →"}
                  </button>
                </form>

                <div className="mt-5 flex items-start gap-2 text-xs text-zinc-500">
                  <Shield size={14} className="shrink-0 mt-0.5 text-zinc-600" />
                  We respect your privacy. Your email is never shared or sold.
                </div>
              </>
            )}
          </div>

          {/* Testimonials */}
          <div className="mt-6 space-y-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              >
                <p className="text-zinc-300 text-sm italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-xs text-zinc-500">
                  <span className="text-zinc-400 font-medium">{t.author}</span> — {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
