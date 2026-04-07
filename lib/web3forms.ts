/**
 * Web3Forms email service
 */

/**
 * Send email via Web3Forms API
 * Web3Forms always delivers to the key owner; extra recipients use `cc` or `replyto`.
 */
export async function sendEmailViaWeb3Forms(
  toEmail: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<{ success: boolean; error?: string }> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not set');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Web3Forms standard fields: access_key, subject, message, email (reply-to), cc
    const payload: Record<string, string> = {
      access_key: accessKey,
      subject,
      // `message` is required by Web3Forms even when using `html`
      message: html,
      from_name: 'Teknopy Contact',
      // send a CC copy to the intended recipient when it differs from the key owner
      cc: toEmail,
    };

    if (replyTo) {
      payload.replyto = replyTo;
    }

    console.log("[v0] Web3Forms payload keys:", Object.keys(payload), "access_key present:", !!payload.access_key, "key value:", payload.access_key?.slice(0, 8))

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Safely parse response — Web3Forms can return HTML on certain errors
    const text = await response.text();
    console.log("[v0] Web3Forms response status:", response.status, "body:", text.slice(0, 300))
    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Web3Forms non-JSON response (status', response.status, '):', text.slice(0, 200));
      return { success: false, error: `Web3Forms HTTP ${response.status}` };
    }

    if (!response.ok || !data.success) {
      console.error('Web3Forms error:', data);
      return { success: false, error: data.message || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(email: string, magicLink: string): Promise<boolean> {
  const result = await sendEmailViaWeb3Forms(
    email,
    `Vérifiez votre adresse email - Teknopy`,
    `
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
          Ou copiez ce lien dans votre navigateur :<br/>
          <code>${magicLink}</code>
        </p>
        <p style="color: #999; font-size: 12px;">
          Ce lien expire dans 24 heures.
        </p>
      </div>
    `,
    email // replyTo so the reply goes back to the user
  );
  return result.success;
}

/**
 * Send admin summary email
 */
export async function sendAdminSummaryEmail(
  contactData: {
    name: string;
    email: string;
    message: string;
    service?: string;
    createdAt: string;
  }
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'manuel.harpon@teknopy.com';
  
  const result = await sendEmailViaWeb3Forms(
    adminEmail,
    `Nouveau message de contact - ${contactData.name}`,
    `
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
      </div>
    `,
    contactData.email // replyTo: clicking reply goes directly to the user
  );
  return result.success;
}

/**
 * Send user confirmation email
 */
export async function sendUserConfirmationEmail(
  toEmail: string,
  contactData: {
    name: string;
    email: string;
    message: string;
    service?: string;
  }
): Promise<boolean> {
  const result = await sendEmailViaWeb3Forms(
    toEmail,
    'Confirmation de votre message - Teknopy',
    `
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
    toEmail // replyTo: replies go back to the user
  );
  return result.success;
}
