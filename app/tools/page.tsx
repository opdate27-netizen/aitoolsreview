import type { Metadata } from "next"
import ToolsCatalog from "@/components/ToolsCatalog"

export const metadata: Metadata = {
  title: "All AI Tools — Browse & Compare",
  description:
    "Browse and compare the best AI tools for writing, SEO, video creation, and design. Filter by category, rating, and free plans.",
  openGraph: {
    title: "All AI Tools — Browse & Compare | AI Tools Review",
    description:
      "Browse and compare the best AI tools for writing, SEO, video, and design.",
    type: "website",
  },
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ToolsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const initialCategory =
    typeof params.category === "string" ? params.category : "All"

  return <ToolsCatalog initialCategory={initialCategory} />
}
