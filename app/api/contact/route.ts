import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendVerificationEmail } from "@/lib/email"
import crypto from "crypto"

// Use service role client to bypass RLS
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

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
    const verificationToken = crypto.randomBytes(32).toString("hex")
    
    // Token expires in 24 hours
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const supabase = createServiceClient()

    // Store verification token in verification_tokens table
    const { error: tokenError } = await supabase
      .from("verification_tokens")
      .insert({
        token: verificationToken,
        email,
        name,
        phone: phone || null,
        service,
        message,
        expires_at: expiresAt.toISOString(),
        used: false,
      })

    if (tokenError) {
      console.error("Supabase error:", tokenError)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      )
    }

    // Get the base URL for the verification link
    // Priority: 1. Env var, 2. Vercel URL, 3. Origin header, 4. Fallback
    const baseUrl = 
      process.env.NEXT_PUBLIC_APP_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      request.headers.get("origin") || 
      "https://v1-teknopy-website.vercel.app"

    // Send verification email to user
    try {
      await sendVerificationEmail(
        { name, email, phone, service, message },
        verificationToken,
        baseUrl
      )
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't fail the request if email fails, token is still saved
    }

    return NextResponse.json({ 
      success: true, 
      message: "Un email de vérification a été envoyé à votre adresse email. Veuillez cliquer sur le lien pour confirmer votre demande.",
      requiresVerification: true
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
