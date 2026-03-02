"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function EmailPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed")
    if (dismissed) return
    const timer = setTimeout(() => setShow(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const dismiss = () => {
    setShow(false)
    sessionStorage.setItem("popup_dismissed", "1")
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button onClick={dismiss} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">You&apos;re in!</h3>
            <p className="text-zinc-400 text-sm">Check your email for the Top 10 AI Tools guide.</p>
            <button onClick={dismiss} className="mt-4 text-sm text-violet-400 hover:text-violet-300">Close</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold mb-2">Get Our Free AI Tools Guide</h3>
              <p className="text-zinc-400 text-sm">The top 10 AI tools ranked by ROI — used by 10,000+ businesses. Free, no spam.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Me the Free Guide →"}
              </button>
            </form>
            <button onClick={dismiss} className="w-full text-center mt-3 text-xs text-zinc-600 hover:text-zinc-400">
              No thanks, I don&apos;t want free tools
            </button>
          </>
        )}
      </div>
    </div>
  )
}
