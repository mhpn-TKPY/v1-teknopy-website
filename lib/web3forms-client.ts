/**
 * Web3Forms client-side email utility.
 * Uses /api/send-email proxy to bypass sandbox restrictions.
 *
 * Key behaviour of Web3Forms:
 *  - Every submission is delivered to the key owner (manuel.harpon@teknopy.com).
 *  - To send to a DIFFERENT address, use the `to` field (requires a verified email or
 *    Pro plan).  We therefore do NOT try to reroute the key owner copy.
 *  - For the magic-link we send ONE submission → admin sees it too (acceptable).
 *  - For the recap we make TWO SEPARATE submissions: one for admin, one for user,
 *    so each person receives a clean, personal email with no CC/BCC mention.
 */

const ADMIN_EMAIL = "manuel.harpon@teknopy.com"

/**
 * Calls the internal proxy route /api/send-email instead of Web3Forms directly.
 * This avoids the vusercontent sandbox blocking external fetch calls,
 * and works identically in production on Vercel.
 */
async function submitToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data: { success?: boolean; error?: string } = await response.json()

    if (!response.ok || !data.success) {
      console.error("Email proxy error:", data.error)
      return false
    }

    return true
  } catch (err) {
    console.error("Email proxy fetch error:", err)
    return false
  }
}

/**
 * Send the magic-link verification email to the user.
 * Web3Forms sends to the key owner by default; we add the user email in `to`
 * so they also receive it (the key owner copy is acceptable as a silent log).
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<boolean> {
  return submitToWeb3Forms({
    subject: "Vérifiez votre adresse email - Teknopy",
    from_name: "Teknopy",
    // replyto keeps the admin as sender context; `to` routes to the user
    replyto: ADMIN_EMAIL,
    to: userEmail,
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
 * Send the admin recap (separate submission — no CC).
 * Delivered to the key owner (admin).
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
 * Send the user confirmation recap (separate submission — no CC).
 * Uses `to` so the user (not just the key owner) receives their personal copy.
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
    to: contactData.email,
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
