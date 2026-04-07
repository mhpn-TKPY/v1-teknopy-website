import { NextResponse } from "next/server"
import { isTokenExpired } from "@/lib/token"
import { getVerificationToken, markVerificationComplete, updateContactStatus } from "@/lib/supabase-service"
import { sendAdminSummaryEmail, sendUserConfirmationEmail } from "@/lib/web3forms"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    console.log("[v0] Verification request received with token:", token?.substring(0, 8) + "...")

    if (!token) {
      return NextResponse.json(
        { error: "Token manquant" },
        { status: 400 }
      )
    }

    // Get verification record
    const verification = await getVerificationToken(token)

    if (!verification) {
      console.error("[v0] Token not found:", token)
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 404 }
      )
    }

    // Check if token has expired
    if (isTokenExpired(new Date(verification.expires_at))) {
      console.error("[v0] Token expired:", token)
      return NextResponse.json(
        { error: "Ce lien a expiré. Veuillez soumettre à nouveau votre formulaire." },
        { status: 410 }
      )
    }

    // Check if already verified
    if (verification.is_verified) {
      console.log("[v0] Token already verified:", token)
      return NextResponse.json(
        { message: "Cet email a déjà été vérifié." },
        { status: 200 }
      )
    }

    const contactData = verification.contact_data
    const { name, email, message, service } = contactData

    console.log("[v0] Email verified, sending confirmation emails...")

    // Send admin summary email
    console.log("[v0] Sending admin summary to manuel.harpon@teknopy.com")
    const adminEmailSent = await sendAdminSummaryEmail({
      name,
      email,
      message,
      service,
      createdAt: new Date().toLocaleString("fr-FR"),
    })

    if (!adminEmailSent) {
      console.error("[v0] Failed to send admin email")
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email admin" },
        { status: 500 }
      )
    }

    // Send user confirmation email
    console.log("[v0] Sending confirmation email to user:", email)
    const userEmailSent = await sendUserConfirmationEmail(email, {
      name,
      email,
      message,
      service,
    })

    if (!userEmailSent) {
      console.error("[v0] Failed to send user confirmation email")
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de votre email de confirmation" },
        { status: 500 }
      )
    }

    // Mark verification as complete
    await markVerificationComplete(token)

    console.log("[v0] Email verification workflow completed successfully for:", email)

    return NextResponse.json({
      success: true,
      message: "Merci ! Votre email a été vérifié et nous vous avons envoyé une copie de votre message.",
      email: email,
    })
  } catch (error) {
    console.error("[v0] Error in verification:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
