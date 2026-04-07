/**
 * Web3Forms client-side email utility.
 * 
 * IMPORTANT: Web3Forms blocks server-side calls from Vercel (Cloudflare 403).
 * This module calls Web3Forms DIRECTLY from the browser — no proxy.
 * The access key is public (embedded in HTML forms by design).
 */

const ACCESS_KEY = "dd2f81b5-56ac-4e05-8320-ae65fddec383"
const ADMIN_EMAIL = "manuel.harpon@teknopy.com"

/**
 * Submit directly to Web3Forms from the browser.
 * This bypasses Cloudflare blocking that occurs on server-side calls.
 */
async function submitToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
    })

    // Safely parse response
    const text = await response.text()
    let data: { success?: boolean; message?: string } = {}
    try {
      data = JSON.parse(text)
    } catch {
      console.error("Web3Forms returned non-JSON:", text.slice(0, 100))
      return false
    }

    if (!response.ok || !data.success) {
      console.error("Web3Forms error:", data.message || response.status)
      return false
    }

    return true
  } catch (err) {
    console.error("Web3Forms fetch error:", err)
    return false
  }
}

/**
 * Send the magic-link verification email to the user.
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<boolean> {
  return submitToWeb3Forms({
    subject: "Vérifiez votre adresse email - Teknopy",
    from_name: "Teknopy",
    email: userEmail,
    replyto: ADMIN_EMAIL,
    botcheck: "",
    message: [
      `Bonjour ${userName},`,
      ``,
      `Merci de votre intérêt pour Teknopy.`,
      `Pour confirmer votre demande de contact, cliquez sur le lien ci-dessous :`,
      ``,
      magicLink,
      ``,
      `Ce lien expire dans 24 heures.`,
      ``,
      `L'équipe Teknopy`,
    ].join("\n"),
  })
}

/**
 * Send the admin recap (delivered to the key owner).
 */
export async function sendAdminRecap(contactData: {
  name: string
  email: string
  message: string
  service?: string
  createdAt: string
}): Promise<boolean> {
  return submitToWeb3Forms({
    subject: `Nouveau message de contact vérifié - ${contactData.name}`,
    from_name: "Teknopy Contact Form",
    email: contactData.email,
    replyto: contactData.email,
    botcheck: "",
    message: [
      `Nouveau message de contact vérifié`,
      ``,
      `Nom     : ${contactData.name}`,
      `Email   : ${contactData.email}`,
      `Service : ${contactData.service || "Non précisé"}`,
      `Date    : ${contactData.createdAt}`,
      ``,
      `Message :`,
      `---------`,
      contactData.message,
    ].join("\n"),
  })
}

/**
 * Send the user confirmation recap.
 */
export async function sendUserRecap(contactData: {
  name: string
  email: string
  message: string
  service?: string
  createdAt: string
}): Promise<boolean> {
  return submitToWeb3Forms({
    subject: `Confirmation de votre demande - Teknopy`,
    from_name: "Teknopy",
    email: contactData.email,
    replyto: ADMIN_EMAIL,
    botcheck: "",
    message: [
      `Bonjour ${contactData.name},`,
      ``,
      `Nous avons bien reçu votre demande. Voici le récapitulatif :`,
      ``,
      `Service : ${contactData.service || "Non précisé"}`,
      `Date    : ${contactData.createdAt}`,
      ``,
      `Votre message :`,
      `---------------`,
      contactData.message,
      ``,
      `Nous vous répondrons dans les 24 heures ouvrées.`,
      ``,
      `L'équipe Teknopy`,
      `${ADMIN_EMAIL}`,
    ].join("\n"),
  })
}
