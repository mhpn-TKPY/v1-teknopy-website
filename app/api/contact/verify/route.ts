import { NextResponse } from "next/server"
import { isTokenExpired } from "@/lib/token"
import { getVerificationToken, markVerificationComplete, storeContactMessage } from "@/lib/supabase-service"
import { sendAdminSummaryEmail, sendUserConfirmationEmail } from "@/lib/web3forms"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 })
    }

    // Fetch verification record
    const verification = await getVerificationToken(token)

    if (!verification) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 404 }
      )
    }

    // Check expiration
    if (isTokenExpired(new Date(verification.expires_at))) {
      return NextResponse.json(
        { error: "Ce lien a expiré. Veuillez soumettre à nouveau votre formulaire." },
        { status: 410 }
      )
    }

    // Check already used
    if (verification.used) {
      return NextResponse.json(
        { success: true, message: "Cet email a déjà été vérifié. Votre demande est bien enregistrée.", email: verification.email },
        { status: 200 }
      )
    }

    const { name, email, message, service, phone } = verification

    // Store verified contact in contacts table
    await storeContactMessage({ name, email, phone, service, message }, true)

    // Send admin summary email
    const adminEmailSent = await sendAdminSummaryEmail({
      name,
      email,
      message,
      service,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
    })

    if (!adminEmailSent) {
      console.error("Failed to send admin email")
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email admin" },
        { status: 500 }
      )
    }

    // Send user confirmation email
    const userEmailSent = await sendUserConfirmationEmail(email, { name, email, message, service })

    if (!userEmailSent) {
      console.error("Failed to send user confirmation email")
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de votre email de confirmation" },
        { status: 500 }
      )
    }

    // Mark token as used
    await markVerificationComplete(token)

    return NextResponse.json({
      success: true,
      message: "Merci ! Votre email a été vérifié. Un récapitulatif vous a été envoyé et notre équipe a été notifiée.",
      email,
    })
  } catch (error) {
    console.error("Error in verify GET:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
