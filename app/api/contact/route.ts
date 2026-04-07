import { NextResponse } from "next/server"
import { generateVerificationToken, generateMagicLink } from "@/lib/token"
import { storeVerificationToken, storeContactMessage } from "@/lib/supabase-service"
import { sendVerificationEmail } from "@/lib/web3forms"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    console.log("[v0] Contact form submission received:", { name, email, service })

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

    // Step 1: Store contact message with is_verified = false
    console.log("[v0] Storing contact message in database...")
    const contactResult = await storeContactMessage(
      name,
      email,
      message,
      service
    )

    if (!contactResult.success) {
      throw new Error("Failed to store contact message")
    }

    // Step 2: Generate verification token
    const token = generateVerificationToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const magicLink = generateMagicLink(token, baseUrl)

    console.log("[v0] Generated magic link for:", email)

    // Step 3: Store verification token
    const contactData = { name, email, phone, service, message }
    await storeVerificationToken(email, token, contactData)

    // Step 4: Send verification email
    console.log("[v0] Sending verification email to:", email)
    const emailSent = await sendVerificationEmail(email, magicLink)

    if (!emailSent) {
      console.error("[v0] Failed to send verification email")
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de vérification" },
        { status: 500 }
      )
    }

    console.log("[v0] Contact submission workflow completed successfully")

    return NextResponse.json({
      success: true,
      message: "Email de vérification envoyé. Veuillez vérifier votre inbox.",
      contactId: contactResult.contactId,
    })
  } catch (error) {
    console.error("[v0] Error in contact POST:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
