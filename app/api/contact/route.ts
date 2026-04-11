import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, services, estimatedTotal, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis" },
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

    // Format services for display
    const servicesText = services && services.length > 0 
      ? services.map((s: { name: string; price: string }) => `- ${s.name}: ${s.price}`).join('\n')
      : "Non specifie"

    const serviceNames = services && services.length > 0
      ? services.map((s: { name: string }) => s.name).join(', ')
      : "Autre"

    // Send email via Web3Forms
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "dd2f81b5-56ac-4e05-8320-ae65fddec383",
        to_email: "manuel.harpon@teknopy.com",
        from_name: "TEKNOPY Concept - Nouveau Contact",
        subject: `Nouvelle demande de devis - ${name}`,
        replyto: email,
        name,
        email,
        phone: phone || "Non fourni",
        services: servicesText,
        estimated_total: estimatedTotal || "Non calcule",
        message,
      }),
    })

    const web3formsResult = await web3formsResponse.json()

    if (!web3formsResult.success) {
      console.error("Web3Forms error:", web3formsResult)
    }

    // Store in Supabase
    const supabase = await createClient()

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      phone: phone || null,
      service: serviceNames,
      message,
    })

    if (error) {
      console.error("Supabase error:", error)
      // If the table doesn't exist yet, still return success if email was sent
      if (error.code === "42P01" && web3formsResult.success) {
        return NextResponse.json({ success: true, message: "Message envoye avec succes" })
      }
    }

    if (web3formsResult.success) {
      return NextResponse.json({ success: true, message: "Message envoye avec succes" })
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    )
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
