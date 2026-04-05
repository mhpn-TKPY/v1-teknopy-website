import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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

    const supabase = await createClient()

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      phone: phone || null,
      service_interest: service || "Autre",
      message,
    })

    if (error) {
      console.error("Supabase error:", error)
      // If the table doesn't exist yet, still return success
      // This allows the form to work before the database is set up
      if (error.code === "42P01") {
        return NextResponse.json({ success: true, message: "Message reçu (mode démo)" })
      }
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "Message envoyé avec succès" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
