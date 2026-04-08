import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = "contact@plistech.com"
const FROM_EMAIL = "Plistech <noreply@plistech.com>"

interface ContactData {
  name: string
  email: string
  phone?: string | null
  service: string
  message: string
}

/**
 * Send verification email to the user
 */
export async function sendVerificationEmail(
  contactData: ContactData,
  verificationToken: string,
  baseUrl: string
) {
  const verificationLink = `${baseUrl}/api/verify-email?token=${verificationToken}`

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: contactData.email,
    subject: "Confirmez votre demande de contact - Teknopy",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de votre demande</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Teknopy</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Bonjour ${contactData.name},</h2>
            
            <p>Merci pour votre intérêt envers nos services!</p>
            
            <p>Pour finaliser votre demande de contact, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        font-weight: bold;
                        display: inline-block;">
                Confirmer mon adresse email
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:<br>
              <a href="${verificationLink}" style="color: #667eea; word-break: break-all;">${verificationLink}</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <h3 style="color: #333; margin-bottom: 10px;">Récapitulatif de votre demande:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nom:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactData.email}</td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactData.phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactData.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px 0;">${contactData.message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.<br>
              © ${new Date().getFullYear()} Teknopy - Fort-de-France, Martinique
            </p>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Error sending verification email:", error)
    throw new Error("Failed to send verification email")
  }

  return data
}

/**
 * Send admin notification email with ALL contact information
 */
export async function sendAdminNotificationEmail(contactData: ContactData & { 
  id: string
  verified_at: string
}) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nouvelle demande de contact vérifiée - ${contactData.name}`,
    replyTo: contactData.email,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de contact</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de contact</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Email vérifié avec succès</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 20px; border-radius: 0 5px 5px 0;">
              <strong style="color: #059669;">Email vérifié le:</strong> ${new Date(contactData.verified_at).toLocaleString('fr-FR', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              Informations du contact
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb; width: 35%;"><strong>ID Contact:</strong></td>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb; font-family: monospace; font-size: 12px;">${contactData.id}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Nom complet:</strong></td>
                <td style="padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 16px; font-weight: bold;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb;">
                  <a href="mailto:${contactData.email}" style="color: #667eea;">${contactData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Téléphone:</strong></td>
                <td style="padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
                  ${contactData.phone ? `<a href="tel:${contactData.phone}" style="color: #667eea;">${contactData.phone}</a>` : '<em style="color: #999;">Non renseigné</em>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb;"><strong>Service demandé:</strong></td>
                <td style="padding: 12px; background: #fff; border: 1px solid #e5e7eb;">
                  <span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${contactData.service}</span>
                </td>
              </tr>
            </table>
            
            <h3 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              Message du client
            </h3>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${contactData.email}?subject=Re: Votre demande de contact - Teknopy" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        font-weight: bold;
                        display: inline-block;">
                Répondre au client
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0 20px;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Cet email a été envoyé automatiquement par le système de contact Teknopy.<br>
              © ${new Date().getFullYear()} Teknopy - Fort-de-France, Martinique
            </p>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Error sending admin notification email:", error)
    throw new Error("Failed to send admin notification email")
  }

  return data
}

/**
 * Send confirmation email to user after verification
 */
export async function sendUserConfirmationEmail(contactData: ContactData) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: contactData.email,
    subject: "Demande confirmée - Teknopy vous répondra sous 24h",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Demande confirmée</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <div style="background: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 30px;">✓</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 24px;">Demande confirmée!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Merci ${contactData.name}!</h2>
            
            <p>Votre adresse email a été vérifiée avec succès. Votre demande de contact a bien été transmise à notre équipe.</p>
            
            <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0;">
              <strong style="color: #059669;">Prochaine étape:</strong><br>
              Un membre de notre équipe vous contactera sous 24 heures ouvrées pour discuter de votre projet.
            </div>
            
            <h3 style="color: #333;">Récapitulatif de votre demande:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactData.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px 0;">${contactData.message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Des questions? Contactez-nous à contact@plistech.com<br>
              © ${new Date().getFullYear()} Teknopy - Fort-de-France, Martinique
            </p>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Error sending user confirmation email:", error)
    throw new Error("Failed to send user confirmation email")
  }

  return data
}
