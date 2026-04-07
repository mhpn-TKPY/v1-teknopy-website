import { NextResponse } from "next/server"
import { isTokenExpired } from "@/lib/token"
import {
  getVerificationToken,
  markVerificationComplete,
  storeContactMessage,
} from "@/lib/supabase-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 })
    }

    const verification = await getVerificationToken(token)

    if (!verification) {
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 404 })
    }

    if (isTokenExpired(new Date(verification.expires_at))) {
      return NextResponse.json(
        { error: "Ce lien a expiré. Veuillez soumettre à nouveau votre formulaire." },
        { status: 410 }
      )
    }

    if (verification.used) {
      return NextResponse.json(
        {
          success: true,
          alreadyVerified: true,
          message: "Cet email a déjà été vérifié. Votre demande est bien enregistrée.",
          email: verification.email,
        },
        { status: 200 }
      )
    }

    const { name, email, message, service, phone } = verification

    // Store verified contact in Supabase
    await storeContactMessage({ name, email, phone, service, message }, true)

    // Mark token as used
    await markVerificationComplete(token)

    // Return contact data so the browser can send emails via Web3Forms directly
    return NextResponse.json({
      success: true,
      message: "Votre email a été vérifié. Envoi des récapitulatifs en cours...",
      email,
      contactData: { name, email, message, service },
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
    })
  } catch (error) {
    console.error("Error in verify GET:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
