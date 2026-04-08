import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendAdminNotificationEmail, sendUserConfirmationEmail } from "@/lib/email"

// Use service role client to bypass RLS for verification
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return new NextResponse(renderErrorPage("Token de vérification manquant"), {
        status: 400,
        headers: { "Content-Type": "text/html" },
      })
    }

    const supabase = createServiceClient()

    // Find the contact with this verification token
    const { data: contact, error: findError } = await supabase
      .from("contacts")
      .select("*")
      .eq("verification_token", token)
      .single()

    if (findError || !contact) {
      return new NextResponse(renderErrorPage("Token de vérification invalide ou expiré"), {
        status: 400,
        headers: { "Content-Type": "text/html" },
      })
    }

    // Check if already verified
    if (contact.email_verified) {
      return new NextResponse(renderAlreadyVerifiedPage(contact.name), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      })
    }

    // Mark email as verified
    const verifiedAt = new Date().toISOString()
    const { error: updateError } = await supabase
      .from("contacts")
      .update({
        email_verified: true,
        verified_at: verifiedAt,
        verification_token: null, // Clear the token after use
      })
      .eq("id", contact.id)

    if (updateError) {
      console.error("Error updating contact:", updateError)
      return new NextResponse(renderErrorPage("Erreur lors de la vérification"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      })
    }

    // Send admin notification email with ALL contact information
    try {
      await sendAdminNotificationEmail({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        service: contact.service_interest || "Non spécifié",
        message: contact.message,
        verified_at: verifiedAt,
      })
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError)
      // Don't fail the verification if admin email fails
    }

    // Send confirmation email to user
    try {
      await sendUserConfirmationEmail({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        service: contact.service_interest || "Non spécifié",
        message: contact.message,
      })
    } catch (emailError) {
      console.error("Error sending user confirmation:", emailError)
    }

    return new NextResponse(renderSuccessPage(contact.name), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Verification error:", error)
    return new NextResponse(renderErrorPage("Erreur serveur"), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    })
  }
}

function renderSuccessPage(name: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email vérifié - Teknopy</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
          }
          .icon {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 40px;
          }
          .header h1 {
            color: white;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #333;
            margin-bottom: 15px;
          }
          .content p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .info-box {
            background: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 15px;
            text-align: left;
            border-radius: 0 8px 8px 0;
            margin-bottom: 25px;
          }
          .info-box strong {
            color: #059669;
          }
          .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">✓</div>
            <h1>Email vérifié avec succès!</h1>
          </div>
          <div class="content">
            <h2>Merci ${name}!</h2>
            <p>Votre adresse email a été confirmée. Votre demande de contact a bien été transmise à notre équipe.</p>
            <div class="info-box">
              <strong>Prochaine étape:</strong><br>
              Un membre de notre équipe vous contactera sous 24 heures ouvrées.
            </div>
            <a href="/" class="btn">Retour à l'accueil</a>
          </div>
        </div>
      </body>
    </html>
  `
}

function renderAlreadyVerifiedPage(name: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Déjà vérifié - Teknopy</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            padding: 40px 30px;
          }
          .icon {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 40px;
          }
          .header h1 {
            color: white;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 25px;
          }
          .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">ℹ️</div>
            <h1>Déjà vérifié</h1>
          </div>
          <div class="content">
            <p>Bonjour ${name}, votre email a déjà été vérifié. Notre équipe vous contactera sous 24 heures ouvrées.</p>
            <a href="/" class="btn">Retour à l'accueil</a>
          </div>
        </div>
      </body>
    </html>
  `
}

function renderErrorPage(message: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Teknopy</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 40px 30px;
          }
          .icon {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 40px;
          }
          .header h1 {
            color: white;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 25px;
          }
          .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">✕</div>
            <h1>Erreur</h1>
          </div>
          <div class="content">
            <p>${message}</p>
            <a href="/" class="btn">Retour à l'accueil</a>
          </div>
        </div>
      </body>
    </html>
  `
}
