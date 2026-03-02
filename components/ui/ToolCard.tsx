import Link from "next/link"
import { Star, ExternalLink, ArrowRight } from "lucide-react"
import { Tool } from "@/types"

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="card-hover relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      {tool.badge && (
        <span className="absolute -top-3 left-4 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
          {tool.badge}
        </span>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white font-bold text-lg">
            {tool.logo}
          </div>
          <div>
            <h3 className="font-semibold text-white">{tool.name}</h3>
            <span className="text-xs text-violet-400">{tool.category}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="text-sm font-semibold">{tool.rating}</span>
          </div>
          <span className="text-xs text-zinc-500">{tool.reviewCount.toLocaleString()} reviews</span>
        </div>
      </div>
      <p className="text-sm text-zinc-400 mb-4 flex-1 line-clamp-2">{tool.tagline}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white">
          {tool.pricing.free ? "Free plan available" : `From ${tool.pricing.startingAt}`}
        </span>
        {tool.pricing.free && (
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">Free tier</span>
        )}
      </div>
      <div className="flex gap-2">
        <Link href={`/tools/${tool.slug}`} className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-violet-500 hover:text-white transition-colors">
          Review <ArrowRight className="h-3 w-3" />
        </Link>
        <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-violet-600 hover:bg-violet-500 px-3 py-2 text-sm font-medium text-white transition-colors">
          Visit <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
