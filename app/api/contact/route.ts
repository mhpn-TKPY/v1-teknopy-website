import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Admin email
const ADMIN_EMAIL = "contact@plistech.com"

// Web3Forms API (service gratuit pour envoyer des emails)
const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY || "YOUR_WEB3FORMS_KEY"

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

    const supabase = createServiceClient()

    // Save contact directly to contacts table (verified = true by default)
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        name,
        email,
        phone: phone || null,
        service,
        message,
        verified: true,
        verified_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (contactError) {
      console.error("Supabase error:", contactError)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      )
    }

    // Send emails using Web3Forms (gratuit et simple)
    const emailPromises = []

    // 1. Email to admin with full recap
    emailPromises.push(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          to: ADMIN_EMAIL,
          from_name: "TEKNOPY Création",
          subject: `Nouvelle demande de contact - ${service}`,
          message: `
NOUVELLE DEMANDE DE CONTACT
============================

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non renseigné"}
Service: ${service}

Message:
${message}

---
Date: ${new Date().toLocaleString("fr-FR", { timeZone: "America/Martinique" })}
ID Contact: ${contact?.id || "N/A"}
          `.trim(),
          replyto: email,
        }),
      }).catch(err => console.error("Admin email error:", err))
    )

    // 2. Confirmation email to user
    emailPromises.push(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          to: email,
          from_name: "TEKNOPY Création",
          subject: "Confirmation de votre demande - TEKNOPY",
          message: `
Bonjour ${name},

Merci pour votre demande de contact!

Récapitulatif de votre demande:
- Service: ${service}
- Message: ${message}
${phone ? `- Téléphone: ${phone}` : ""}

Notre équipe vous répondra sous 24 heures.

Cordialement,
L'équipe TEKNOPY Création

---
TEKNOPY Création
Le web au service de l'innovation
Tél: +596 696 617 151
Email: contact@plistech.com
          `.trim(),
        }),
      }).catch(err => console.error("User email error:", err))
    )

    // Send emails in parallel (don't wait for them to complete)
    Promise.all(emailPromises).catch(err => 
      console.error("Email sending failed:", err)
    )

    return NextResponse.json({ 
      success: true, 
      message: "Votre message a été envoyé avec succès! Nous vous répondrons sous 24 heures.",
      requiresVerification: false
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
