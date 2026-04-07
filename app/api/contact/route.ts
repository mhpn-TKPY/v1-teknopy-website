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

    // Generate magic link token
    const token = generateVerificationToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.plistech.com"
    const magicLink = generateMagicLink(token, baseUrl)

    // Store token + contact data in Supabase (server-only operation)
    await storeVerificationToken(token, { name, email, phone, service, message })

    // Return the magic link to the client — the browser will call Web3Forms directly
    return NextResponse.json({
      success: true,
      magicLink,
      email,
      name,
    })
  } catch (error) {
    console.error("Error in contact POST:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
