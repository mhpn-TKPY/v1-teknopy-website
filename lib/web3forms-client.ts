/**
 * Web3Forms client-side email utility.
 * Must be called from the browser — Web3Forms blocks server-side requests (Cloudflare 403).
 *
 * How Web3Forms routing works:
 *  - The key owner (manuel.harpon@teknopy.com) ALWAYS receives every submission.
 *  - `cc`  adds extra recipients on every email.
 *  - For the magic-link email we want ONLY the user to receive it — we use a
 *    dedicated second access key bound to a noreply/forwarding address, OR we
 *    accept that the key owner receives a copy and focus on making sure the
 *    user also gets theirs via `cc`.
 *  - For the admin summary we send normally (key owner = admin) and CC the user.
 */

const ACCESS_KEY = "dd2f81b5-56ac-4e05-8320-ae65fddec383"
const ADMIN_EMAIL = "manuel.harpon@teknopy.com"

async function submitToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  try {
    const body = JSON.stringify({ access_key: ACCESS_KEY, ...payload })
    console.log("[v0] Web3Forms submit payload keys:", Object.keys({ access_key: ACCESS_KEY, ...payload }))

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })

    const text = await response.text()
    console.log("[v0] Web3Forms status:", response.status, "body:", text.slice(0, 300))

    let data: { success?: boolean; message?: string } = {}
    try {
      data = JSON.parse(text)
    } catch {
      console.error("[v0] Web3Forms non-JSON response:", text.slice(0, 200))
      return false
    }
    if (!response.ok || !data.success) {
      console.error("[v0] Web3Forms error response:", data)
      return false
    }
    return true
  } catch (error) {
    console.error("[v0] Web3Forms fetch error:", error)
    return false
  }
}

/**
 * Send the magic-link verification email.
 * Web3Forms always delivers to the key owner; we CC the user so they receive it too.
 * Subject and body make clear it is intended for the user.
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<boolean> {
  return submitToWeb3Forms({
    subject: `Vérifiez votre adresse email - Teknopy`,
    from_name: "Teknopy",
    // `email` field in Web3Forms = the reply-to AND the displayed sender context.
    // We put the user email here so replies go to them.
    email: userEmail,
    // CC the user explicitly so they receive this email in their inbox.
    cc: userEmail,
    // botcheck must be empty (honeypot)
    botcheck: "",
    message: `Bonjour ${userName},\n\nMerci de votre intérêt pour Teknopy.\nPour confirmer votre demande de contact, cliquez sur le lien ci-dessous :\n\n${magicLink}\n\nCe lien expire dans 24 heures.\n\nL'équipe Teknopy`,
  })
}

/**
 * Send the admin summary email after the user clicks the magic link.
 * Key owner (admin) receives it by default; user gets a CC copy.
 */
export async function sendAdminEmail(contactData: {
  name: string
  email: string
  message: string
  service?: string
  createdAt: string
}): Promise<boolean> {
  return submitToWeb3Forms({
    subject: `Nouveau message de contact vérifié - ${contactData.name}`,
    from_name: "Teknopy Contact Form",
    // reply-to = user so admin can reply directly to them
    email: contactData.email,
    // CC the user so they get their confirmation copy in the same send
    cc: contactData.email,
    botcheck: "",
    message: [
      `Nouveau message de contact vérifié`,
      ``,
      `Nom    : ${contactData.name}`,
      `Email  : ${contactData.email}`,
      `Service: ${contactData.service || "Non précisé"}`,
      `Date   : ${contactData.createdAt}`,
      ``,
      `Message :`,
      contactData.message,
    ].join("\n"),
  })
}
