import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY
const ADMIN_EMAIL = "manuel.harpon@teknopy.com"

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

    // Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase.from("contacts").insert({
      name,
      email,
      phone: phone || null,
      service_interest: service || "Autre",
      message,
    })

    if (dbError) {
      console.error("[v0] Supabase error:", dbError)
      // Continue even if database fails - email is more important
    }

    // Check if Web3Forms is configured
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error("[v0] WEB3FORMS_ACCESS_KEY is not configured")
      return NextResponse.json(
        { error: "Configuration email manquante. Veuillez contacter l'administrateur." },
        { status: 500 }
      )
    }

    // Send email to admin via Web3Forms
    const adminEmailData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `[Teknopy] Nouvelle demande de contact - ${service}`,
      from_name: "Teknopy Contact Form",
      to: ADMIN_EMAIL,
      name: name,
      email: email,
      phone: phone || "Non renseigné",
      service: service,
      message: message,
      botcheck: false,
    }

    const adminResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(adminEmailData),
    })

    const adminResult = await adminResponse.json()

    if (!adminResult.success) {
      console.error("[v0] Web3Forms admin email error:", adminResult)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
        { status: 500 }
      )
    }

    // Send confirmation email to client via Web3Forms
    const clientEmailData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Confirmation de votre demande - Teknopy",
      from_name: "Teknopy",
      to: email,
      replyto: ADMIN_EMAIL,
      botcheck: false,
      // Custom message for client
      message: `
Bonjour ${name},

Nous avons bien reçu votre demande de contact concernant : ${service}

Votre message :
"${message}"

Notre équipe vous répondra dans les plus brefs délais.

Cordialement,
L'équipe Teknopy

---
Ceci est un email automatique, merci de ne pas y répondre directement.
Pour nous contacter : ${ADMIN_EMAIL}
      `.trim(),
    }

    const clientResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clientEmailData),
    })

    const clientResult = await clientResponse.json()

    if (!clientResult.success) {
      console.error("[v0] Web3Forms client email error:", clientResult)
      // Don't fail the request if client email fails - admin already received it
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message envoyé avec succès. Vous recevrez une confirmation par email." 
    })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}
