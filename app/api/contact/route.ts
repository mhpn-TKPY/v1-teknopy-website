import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Use service role client to bypass RLS
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Cette API ne fait que sauvegarder en base de données
// L'envoi d'email est géré côté client via Web3Forms (évite le blocage Cloudflare)
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

    // Save contact to database
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
      // Return success anyway - email was sent via Web3Forms client-side
      return NextResponse.json({ 
        success: true, 
        message: "Contact reçu" 
      })
    }

    return NextResponse.json({ 
      success: true, 
      contact,
      message: "Contact sauvegardé avec succès" 
    })
  } catch (error) {
    console.error("Error:", error)
    // Return success - the main email sending happens client-side via Web3Forms
    return NextResponse.json({ 
      success: true, 
      message: "Traitement en cours" 
    })
  }
}
