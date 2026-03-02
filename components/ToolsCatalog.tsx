"use client"

import { useState, useEffect } from "react"
import { tools, categories } from "@/lib/tools"
import ToolCard from "@/components/ui/ToolCard"
import { Search, SlidersHorizontal } from "lucide-react"

const ALL = "All"
const allCategories = [ALL, ...categories]

const sortOptions = [
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Name A–Z", value: "name" },
]

export default function ToolsCatalog({ initialCategory }: { initialCategory: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  const filtered = tools
    .filter((t) => {
      const matchCat = activeCategory === ALL || t.category === activeCategory
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tagline.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      const matchFree = !showFreeOnly || t.pricing.free
      return matchCat && matchSearch && matchFree
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">All AI Tools</h1>
        <p className="text-zinc-400">
          Browse {tools.length} AI tools — rated and reviewed by our team
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5">
            <SlidersHorizontal size={16} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-zinc-300 text-sm focus:outline-none cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-zinc-900">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                showFreeOnly ? "bg-violet-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  showFreeOnly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-sm text-zinc-400 whitespace-nowrap">Free plan</span>
          </label>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-violet-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {cat}
            {cat !== ALL && (
              <span className="ml-1.5 text-xs opacity-60">
                ({tools.filter((t) => t.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-500 mb-5">
        Showing {filtered.length} of {tools.length} tools
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-24 text-zinc-500">
          <Search size={40} className="opacity-30" />
          <p className="text-lg">No tools match your filters.</p>
          <button
            onClick={() => {
              setSearch("")
              setActiveCategory(ALL)
              setShowFreeOnly(false)
            }}
            className="text-violet-400 hover:text-violet-300 text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
