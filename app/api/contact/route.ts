import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendVerificationEmail } from "@/lib/email"
import crypto from "crypto"

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

    const supabase = await createClient()

    const { data: contact, error } = await supabase
      .from("contacts")
      .insert({
        name,
        email,
        phone: phone || null,
        service_interest: service,
        message,
        verification_token: verificationToken,
        email_verified: false,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      // If the table doesn't exist yet, still return success
      if (error.code === "42P01") {
        return NextResponse.json({ 
          success: true, 
          message: "Message reçu (mode démo)",
          requiresVerification: false 
        })
      }
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      )
    }

    // Get the base URL for the verification link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
      request.headers.get("origin") || 
      "https://teknopy.com"

    // Send verification email to user
    try {
      await sendVerificationEmail(
        { name, email, phone, service, message },
        verificationToken,
        baseUrl
      )
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't fail the request if email fails, contact is still saved
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
