// CACHE_BUSTER_2026_04_07_v2 — force recompilation
import { NextResponse } from "next/server"
import { generateVerificationToken, generateMagicLink } from "@/lib/token"
import { storeVerificationToken } from "@/lib/supabase-service"

// This route ONLY interacts with Supabase. NO Web3Forms calls here.
// Email sending is handled entirely client-side via /api/send-email proxy.
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

    const token = generateVerificationToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.plistech.com"
    const magicLink = generateMagicLink(token, baseUrl)

    await storeVerificationToken(token, { name, email, phone, service, message })

    return NextResponse.json({ success: true, magicLink, email, name })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
