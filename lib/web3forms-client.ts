/**
 * Web3Forms client-side email utility.
 * Must be called from the browser — Web3Forms blocks server-side requests via Cloudflare.
 */

const ACCESS_KEY = "dd2f81b5-56ac-4e05-8320-ae65fddec383"
const ADMIN_EMAIL = "manuel.harpon@teknopy.com"

async function submitToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
    })
    const text = await response.text()
    let data: { success?: boolean; message?: string } = {}
    try {
      data = JSON.parse(text)
    } catch {
      console.error("Web3Forms non-JSON response:", text.slice(0, 200))
      return false
    }
    return !!(response.ok && data.success)
  } catch (error) {
    console.error("Web3Forms fetch error:", error)
    return false
  }
}

/** Send the magic link verification email to the user */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<boolean> {
  return submitToWeb3Forms({
    subject: "Vérifiez votre adresse email - Teknopy",
    from_name: "Teknopy",
    cc: userEmail,
    replyto: userEmail,
    message: `Bonjour ${userName},\n\nMerci de votre intérêt pour Teknopy.\nPour confirmer votre demande de contact, cliquez sur le lien ci-dessous :\n\n${magicLink}\n\nCe lien expire dans 24 heures.\n\nL'équipe Teknopy`,
  })
}

/** Send the admin summary email after verification */
export async function sendAdminEmail(contactData: {
  name: string
  email: string
  message: string
  service?: string
  createdAt: string
}): Promise<boolean> {
  return submitToWeb3Forms({
    subject: `Nouveau message de contact - ${contactData.name}`,
    from_name: "Teknopy Contact Form",
    cc: ADMIN_EMAIL,
    replyto: contactData.email,
    message: `Nouveau message de contact vérifié\n\nNom : ${contactData.name}\nEmail : ${contactData.email}\nService : ${contactData.service || "Non précisé"}\nDate : ${contactData.createdAt}\n\nMessage :\n${contactData.message}`,
  })
}

/** Send the confirmation recap email to the user */
export async function sendUserConfirmationEmail(contactData: {
  name: string
  email: string
  message: string
  service?: string
}): Promise<boolean> {
  return submitToWeb3Forms({
    subject: "Confirmation de votre message - Teknopy",
    from_name: "Teknopy",
    cc: contactData.email,
    replyto: ADMIN_EMAIL,
    message: `Bonjour ${contactData.name},\n\nNous avons bien reçu votre message et notre équipe vous répondra dans les plus brefs délais.\n\nRécapitulatif de votre demande :\n- Service : ${contactData.service || "Non précisé"}\n- Email : ${contactData.email}\n\nVotre message :\n${contactData.message}\n\nMerci de votre confiance.\nL'équipe Teknopy`,
  })
}
