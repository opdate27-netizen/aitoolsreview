import Link from "next/link"
import { Shield, Star, TrendingUp, Users, Zap, ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About AI Tools Review — Our Mission & Review Process",
  description:
    "AI Tools Review is an independent publication testing and ranking the best AI tools for businesses and creators. Learn about our review process and editorial standards.",
  openGraph: {
    title: "About AI Tools Review",
    description:
      "Independent reviews of the best AI tools — tested hands-on, updated regularly, no sponsored rankings.",
    type: "website",
  },
}

const STATS = [
  { value: "23+", label: "Tools Reviewed" },
  { value: "14+", label: "In-Depth Articles" },
  { value: "200+", label: "Hours of Testing" },
  { value: "2026", label: "Fully Updated" },
]

const REVIEW_PROCESS = [
  {
    step: "01",
    title: "We sign up and pay",
    body: "We create real accounts on every tool we review — often paying out of pocket. We never accept free access in exchange for positive coverage.",
  },
  {
    step: "02",
    title: "We test with real tasks",
    body: "We run the same benchmark tasks across every tool in a category — blog posts, ad copy, SEO audits, video creation — so comparisons are apples-to-apples.",
  },
  {
    step: "03",
    title: "We score objectively",
    body: "Ratings are based on output quality, ease of use, pricing value, and reliability. A tool with great marketing but mediocre output gets a mediocre score.",
  },
  {
    step: "04",
    title: "We update when things change",
    body: "AI tools change fast. We revisit reviews when pricing updates, major features ship, or quality shifts. Every review shows when it was last tested.",
  },
]

const DISCLOSURE_POINTS = [
  "We earn affiliate commissions when you click our links and purchase a tool.",
  "Affiliate relationships never influence our ratings or recommendations.",
  "We include cons for every tool we recommend — including our top picks.",
  "Tools are never ranked higher because they pay higher commissions.",
  "We disclose affiliate links on every page where they appear.",
]

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
          <Zap size={14} className="text-violet-400" />
          Independent · Honest · Updated 2026
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          We Test AI Tools So You{" "}
          <span className="gradient-text">Don&apos;t Have To</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
          AI Tools Review is an independent publication dedicated to honest, hands-on reviews
          of the best AI software for businesses and creators. No sponsored rankings.
          No fluff. Just real testing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <p className="text-zinc-300 leading-relaxed mb-4">
            The AI tools market is noisy. Every week there&apos;s a new tool claiming to be the
            best, review sites ranking tools based on who pays the most, and affiliate marketers
            recommending things they&apos;ve never actually used.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We started AI Tools Review because we got burned by bad recommendations ourselves.
            We bought tools based on glowing reviews that turned out to be shallow, sponsored,
            or just plain wrong.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Our mission is simple: test everything hands-on, tell you what actually works,
            and be honest about the trade-offs — even when it costs us affiliate revenue.
          </p>
        </div>
      </section>

      {/* Review Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">How We Review Tools</h2>
        <div className="space-y-4">
          {REVIEW_PROCESS.map(({ step, title, body }) => (
            <div
              key={step}
              className="flex gap-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-zinc-700 shrink-0 w-10">{step}</div>
              <div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we evaluate */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">What We Evaluate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Star className="text-yellow-400" size={22} />,
              title: "Output Quality",
              body: "Does it actually produce good work? We compare outputs side-by-side across competitors.",
            },
            {
              icon: <Users className="text-violet-400" size={22} />,
              title: "Ease of Use",
              body: "Can a non-technical person get value from it quickly? Onboarding and UI matter.",
            },
            {
              icon: <TrendingUp className="text-green-400" size={22} />,
              title: "Pricing Value",
              body: "Is the price justified by the output? We calculate cost-per-use for every tier.",
            },
            {
              icon: <Zap className="text-cyan-400" size={22} />,
              title: "Speed & Reliability",
              body: "Does it work consistently? We test uptime, generation speed, and error rates.",
            },
            {
              icon: <Shield className="text-blue-400" size={22} />,
              title: "Support Quality",
              body: "When something breaks, how fast and helpful is the support team?",
            },
            {
              icon: <ArrowRight className="text-pink-400" size={22} />,
              title: "Real-World ROI",
              body: "Does it save meaningful time or money? We calculate actual hours saved per week.",
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div className="mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Affiliate Disclosure</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <p className="text-zinc-300 leading-relaxed mb-5">
            AI Tools Review earns affiliate commissions when readers click our links and
            purchase a product. This is how we fund the site and keep reviews free.
            Here&apos;s exactly how we handle it:
          </p>
          <ul className="space-y-3">
            {DISCLOSURE_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-zinc-300 text-sm">
                <Check size={15} className="text-green-400 shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="text-center">
        <div className="bg-gradient-to-br from-violet-950/50 to-zinc-900 border border-violet-700/30 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Have a tool you want us to review?
          </h2>
          <p className="text-zinc-400 mb-6">
            We&apos;re always looking for new tools to test. Reach out and we&apos;ll add it
            to our review queue — no payment required, no guaranteed positive coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse All Tools <ArrowRight size={17} />
            </Link>
            <Link
              href="/free-guide"
              className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Get Free Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
