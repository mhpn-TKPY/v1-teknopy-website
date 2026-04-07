import { NextResponse } from "next/server"
import { generateVerificationToken, generateMagicLink } from "@/lib/token"
import { storeVerificationToken } from "@/lib/supabase-service"
import { sendVerificationEmail } from "@/lib/web3forms"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Nom, email, service et message sont requis" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      )
    }

    // Generate verification token
    const token = generateVerificationToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.plistech.com"
    const magicLink = generateMagicLink(token, baseUrl)

    // Store token + contact data in verification_tokens
    await storeVerificationToken(token, { name, email, phone, service, message })

    // Send verification email with magic link
    const emailSent = await sendVerificationEmail(email, magicLink)

    if (!emailSent) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de vérification" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Un email de vérification a été envoyé. Cliquez sur le lien pour confirmer votre demande.",
    })
  } catch (error) {
    console.error("Error in contact POST:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
