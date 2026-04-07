/**
 * Email templates pour Web3Forms
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Template pour email de vérification avec magic link
 */
export function getVerificationEmailTemplate(magicLink: string, userEmail: string): EmailTemplate {
  return {
    subject: 'Vérifiez votre adresse email - Teknopy',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Vérification de votre adresse email</h2>
        <p style="color: #666; font-size: 14px;">
          Merci de votre intérêt pour Teknopy. Pour confirmer que vous n'êtes pas un robot et que votre adresse email est valide, 
          veuillez cliquer sur le lien ci-dessous :
        </p>
        <a href="${magicLink}" style="
          display: inline-block;
          background-color: #007bff;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        ">Vérifier mon email</a>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Ou copiez ce lien dans votre navigateur : ${magicLink}
        </p>
        <p style="color: #999; font-size: 12px;">
          Ce lien expire dans 24 heures.
        </p>
      </div>
    `,
    text: `Vérifiez votre adresse email en cliquant sur ce lien : ${magicLink}\nCe lien expire dans 24 heures.`,
  };
}

/**
 * Template pour email récapitulatif à l'admin
 */
export function getAdminSummaryTemplate(contactData: {
  name: string;
  email: string;
  message: string;
  service?: string;
  createdAt: string;
}): EmailTemplate {
  return {
    subject: `Nouveau message de contact - ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouveau message de contact vérifié</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom :</strong> ${contactData.name}</p>
          <p><strong>Email :</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          ${contactData.service ? `<p><strong>Service :</strong> ${contactData.service}</p>` : ''}
          <p><strong>Date :</strong> ${contactData.createdAt}</p>
        </div>
        <h3 style="color: #333;">Message :</h3>
        <p style="color: #666; white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Message automatiquement envoyé par le système de contact Teknopy.
        </p>
      </div>
    `,
    text: `Nouveau message de contact.\n\nNom : ${contactData.name}\nEmail : ${contactData.email}\nService : ${contactData.service || 'Non spécifié'}\n\nMessage :\n${contactData.message}`,
  };
}

/**
 * Template pour email de confirmation à l'utilisateur
 */
export function getUserConfirmationTemplate(contactData: {
  name: string;
  email: string;
  message: string;
  service?: string;
}): EmailTemplate {
  return {
    subject: 'Confirmation de votre message - Teknopy',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Merci pour votre message !</h2>
        <p style="color: #666;">Bonjour ${contactData.name},</p>
        <p style="color: #666;">
          Nous avons bien reçu votre message. Notre équipe l'examinera et vous répondra dans les plus brefs délais.
        </p>
        <h3 style="color: #333; margin-top: 20px;">Récapitulatif de votre message :</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom :</strong> ${contactData.name}</p>
          <p><strong>Email :</strong> ${contactData.email}</p>
          ${contactData.service ? `<p><strong>Service :</strong> ${contactData.service}</p>` : ''}
        </div>
        <h3 style="color: #333;">Votre message :</h3>
        <p style="color: #666; white-space: pre-wrap; line-height: 1.6; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff;">${contactData.message}</p>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Merci de votre confiance. À bientôt !
        </p>
      </div>
    `,
    text: `Merci pour votre message, ${contactData.name}.\n\nNous avons reçu votre message et notre équipe vous répondra bientôt.\n\nCordialement,\nL'équipe Teknopy`,
  };
}
