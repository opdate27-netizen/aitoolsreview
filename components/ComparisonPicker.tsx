"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { tools } from "@/lib/tools"
import { ArrowLeftRight, ArrowRight } from "lucide-react"

export default function ComparisonPicker() {
  const [tool1, setTool1] = useState("")
  const [tool2, setTool2] = useState("")
  const router = useRouter()

  const canCompare = tool1 && tool2 && tool1 !== tool2

  function handleCompare() {
    if (canCompare) {
      router.push(`/compare/${tool1}-vs-${tool2}`)
    }
  }

  const tool1Options = tools.filter((t) => t.slug !== tool2)
  const tool2Options = tools.filter((t) => t.slug !== tool1)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <ArrowLeftRight size={20} className="text-violet-400" />
        <h2 className="text-lg font-bold text-white">Compare Any Two AI Tools</h2>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Pick two tools and we'll show you a full side-by-side breakdown.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Tool 1 */}
        <select
          value={tool1}
          onChange={(e) => setTool1(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 focus:border-violet-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer appearance-none"
        >
          <option value="" disabled className="bg-zinc-900">
            Select first tool…
          </option>
          {tool1Options.map((t) => (
            <option key={t.slug} value={t.slug} className="bg-zinc-900">
              {t.name}
            </option>
          ))}
        </select>

        {/* VS divider */}
        <div className="flex items-center justify-center">
          <span className="text-sm font-bold text-zinc-600 bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
            vs
          </span>
        </div>

        {/* Tool 2 */}
        <select
          value={tool2}
          onChange={(e) => setTool2(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 focus:border-violet-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer appearance-none"
        >
          <option value="" disabled className="bg-zinc-900">
            Select second tool…
          </option>
          {tool2Options.map((t) => (
            <option key={t.slug} value={t.slug} className="bg-zinc-900">
              {t.name}
            </option>
          ))}
        </select>

        {/* Compare button */}
        <button
          onClick={handleCompare}
          disabled={!canCompare}
          className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm"
        >
          Compare <ArrowRight size={16} />
        </button>
      </div>

      {tool1 && tool2 && tool1 === tool2 && (
        <p className="text-xs text-red-400 mt-3">Please select two different tools.</p>
      )}
    </div>
  )
}
