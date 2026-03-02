import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // If Supabase is configured, store the email
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error } = await supabase
        .from("subscribers")
        .insert({ email, subscribed_at: new Date().toISOString() })

      if (error && error.code !== "23505") {
        // 23505 = unique violation (already subscribed)
        console.error("Supabase insert error:", error)
        return NextResponse.json({ error: "Could not save email" }, { status: 500 })
      }
    } else {
      // No DB configured — log and continue (works for local dev)
      console.log(`[subscribe] New subscriber: ${email}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
