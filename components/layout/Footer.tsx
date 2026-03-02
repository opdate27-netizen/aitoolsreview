import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <Zap className="h-5 w-5 text-violet-400" />
              <span className="gradient-text">AIToolsReview</span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-xs">
              Independent, honest reviews of the best AI tools in 2026. We test everything so you can buy with confidence.
            </p>
            <p className="text-zinc-600 text-xs mt-4">
              * Some links are affiliate links. We earn a commission at no extra cost to you.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/tools?category=AI+Writing" className="hover:text-white transition-colors">AI Writing</Link></li>
              <li><Link href="/tools?category=SEO+Tools" className="hover:text-white transition-colors">SEO Tools</Link></li>
              <li><Link href="/tools?category=AI+Video" className="hover:text-white transition-colors">AI Video</Link></li>
              <li><Link href="/tools?category=AI+Design" className="hover:text-white transition-colors">AI Design</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Site</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Deals</Link></li>
              <li><Link href="/free-guide" className="hover:text-white transition-colors">Free Guide</Link></li>
              <li><Link href="/compare/jasper-ai-vs-writesonic" className="hover:text-white transition-colors">Comparisons</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">All Tools</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} AIToolsReview. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
