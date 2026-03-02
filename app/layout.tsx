import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import EmailPopup from "@/components/ui/EmailPopup"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AI Tools Review — Find the Best AI Tools for Your Business",
    template: "%s | AI Tools Review",
  },
  description: "Independent reviews, comparisons, and rankings of the best AI tools in 2026. Find the right AI tool for writing, video, SEO, and design.",
  keywords: ["AI tools", "AI writing tools", "best AI tools 2026", "Jasper AI review", "Surfer SEO review"],
  openGraph: {
    type: "website",
    siteName: "AI Tools Review",
    title: "AI Tools Review — Find the Best AI Tools for Your Business",
    description: "Independent reviews, comparisons, and rankings of the best AI tools in 2026.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <EmailPopup />
      </body>
    </html>
  )
}
