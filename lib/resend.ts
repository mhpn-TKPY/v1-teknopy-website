import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Domain plistech.com is verified in Resend (via Cloudflare DNS)
const FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL || 'Teknopy <noreply@plistech.com>';
// Note: ADMIN_EMAIL is used for receiving notifications and display only, NOT for sending
// Resend only allows sending from verified domains, so we use plistech.com for from/replyTo
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@plistech.com';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'contact@plistech.com';

// Logo URL for emails (must be publicly accessible)
const LOGO_URL = process.env.NEXT_PUBLIC_SITE_URL 
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo-teknopy.png`
  : 'https://www.plistech.com/images/logo-teknopy.png';

// Reusable email header with Teknopy logo
const EMAIL_HEADER = `
  <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
    <img src="${LOGO_URL}" alt="Teknopy Création" style="max-width: 150px; height: auto;" />
  </div>
`;

// Reusable email footer
const EMAIL_FOOTER = `
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <div style="text-align: center; color: #999; font-size: 12px;">
    <p>L'équipe Teknopy<br>
    <a href="mailto:${REPLY_TO_EMAIL}" style="color: #16a34a;">${REPLY_TO_EMAIL}</a><br>
    <a href="https://www.plistech.com" style="color: #16a34a;">www.plistech.com</a></p>
  </div>
`;

interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Send verification email with magic link to the user
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<EmailResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Vérifiez votre adresse email - Teknopy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${EMAIL_HEADER}
          <h2 style="color: #16a34a;">Vérification de votre email</h2>
          <p>Bonjour ${userName},</p>
          <p>Merci de votre intérêt pour Teknopy.</p>
          <p>Pour confirmer votre demande de contact, cliquez sur le bouton ci-dessous :</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicLink}" 
               style="background-color: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Vérifier mon email
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Ou copiez ce lien dans votre navigateur :</p>
          <p style="color: #16a34a; font-size: 12px; word-break: break-all;">${magicLink}</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">Ce lien expire dans 24 heures.</p>
          ${EMAIL_FOOTER}
        </div>
      `,
    });

    if (error) {
      console.error('[resend] Verification email error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[resend] Verification email exception:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Send admin notification with contact details
 */
export async function sendAdminNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
}): Promise<EmailResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: contactData.email,
      subject: `Nouveau message de contact - ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${EMAIL_HEADER}
          <h2 style="color: #16a34a;">Nouveau message de contact vérifié</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${contactData.name}</p>
            <p><strong>Email :</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            ${contactData.phone ? `<p><strong>Téléphone :</strong> ${contactData.phone}</p>` : ''}
            <p><strong>Service :</strong> ${contactData.service || 'Non précisé'}</p>
            <p><strong>Date :</strong> ${contactData.createdAt}</p>
          </div>
          <h3 style="color: #333;">Message :</h3>
          <div style="background-color: #fafafa; padding: 15px; border-left: 4px solid #16a34a; margin: 10px 0;">
            <p style="white-space: pre-wrap; margin: 0;">${contactData.message}</p>
          </div>
          ${EMAIL_FOOTER}
        </div>
      `,
    });

    if (error) {
      console.error('[resend] Admin notification error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[resend] Admin notification exception:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Send confirmation recap to the user
 */
export async function sendUserConfirmation(contactData: {
  name: string;
  email: string;
  service?: string;
  message: string;
  createdAt: string;
}): Promise<EmailResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactData.email,
      replyTo: REPLY_TO_EMAIL,
      subject: 'Confirmation de votre demande - Teknopy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${EMAIL_HEADER}
          <h2 style="color: #16a34a;">Confirmation de votre demande</h2>
          <p>Bonjour ${contactData.name},</p>
          <p>Nous avons bien reçu votre demande. Voici le récapitulatif :</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service :</strong> ${contactData.service || 'Non précisé'}</p>
            <p><strong>Date :</strong> ${contactData.createdAt}</p>
          </div>
          <h3 style="color: #333;">Votre message :</h3>
          <div style="background-color: #fafafa; padding: 15px; border-left: 4px solid #16a34a; margin: 10px 0;">
            <p style="white-space: pre-wrap; margin: 0;">${contactData.message}</p>
          </div>
          <p style="margin-top: 20px;">Nous vous répondrons dans les 24 heures ouvrées.</p>
          ${EMAIL_FOOTER}
        </div>
      `,
    });

    if (error) {
      console.error('[resend] User confirmation error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[resend] User confirmation exception:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
