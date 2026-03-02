"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/tools", label: "All Tools" },
    { href: "/deals", label: "🔥 Deals" },
    { href: "/compare/jasper-ai-vs-writesonic", label: "Compare" },
    { href: "/blog", label: "Blog" },
    { href: "/free-guide", label: "Free Guide" },
  ]
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-5 w-5 text-violet-400" />
            <span className="gradient-text">AIToolsReview</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/free-guide" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors">
              Get Free Guide
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-300 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/free-guide" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white text-center" onClick={() => setOpen(false)}>
            Get Free Guide
          </Link>
        </div>
      )}
    </nav>
  )
}
