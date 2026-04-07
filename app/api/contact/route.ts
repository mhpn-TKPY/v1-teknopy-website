// v5 — no Web3Forms calls here, Supabase-only
import { NextResponse } from "next/server"
import { generateVerificationToken, generateMagicLink } from "@/lib/token"
import { storeVerificationToken } from "@/lib/supabase-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Nom, email, service et message sont requis" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    // Generate token and magic link (server-only)
    const token = generateVerificationToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.plistech.com"
    const magicLink = generateMagicLink(token, baseUrl)

    // Store token + contact data in Supabase only — NO email calls here
    await storeVerificationToken(token, { name, email, phone, service, message })

    // Return magic link + user info to the browser
    // The browser (contact-form.tsx) will call Web3Forms directly
    return NextResponse.json({ success: true, magicLink, email, name })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
