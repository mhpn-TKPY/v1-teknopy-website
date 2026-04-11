import { Resend } from 'resend'

// Resend instance for Espace Client emails only
// Web3Forms is used for the Vitrine (contact forms)
export const resend = new Resend(process.env.RESEND_API_KEY)

// Admin email for notifications
export const ADMIN_EMAIL = 'manuel.harpon@teknopy.com'
// Use onboarding@resend.dev for testing, or a verified domain in production
export const FROM_EMAIL = 'TEKNOPY Concept <onboarding@resend.dev>'

// Email types for Espace Client
export type EmailType = 
  | 'welcome'
  | 'project_created'
  | 'project_status_update'
  | 'new_message'
  | 'admin_new_signup'
  | 'admin_new_project'
  | 'admin_new_message'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      replyTo: replyTo || ADMIN_EMAIL,
    })

    if (error) {
      console.error('[Resend] Error sending email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('[Resend] Exception:', error)
    return { success: false, error }
  }
}

// Send welcome email to new user
export async function sendWelcomeEmail(user: {
  email: string
  firstName: string
  lastName: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a5f2a 0%, #2d8a3e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue chez TEKNOPY Concept</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px;">Bonjour <strong>${user.firstName}</strong>,</p>
        
        <p>Votre compte a ete cree avec succes ! Vous pouvez maintenant acceder a votre espace client pour :</p>
        
        <ul style="padding-left: 20px;">
          <li>Suivre l'avancement de vos projets</li>
          <li>Demander des devis personnalises</li>
          <li>Acceder a vos factures et documents</li>
          <li>Communiquer directement avec notre equipe</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.plistech.com/auth/connexion" 
             style="background: #1a5f2a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Acceder a mon espace client
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Vos identifiants de connexion :<br>
          <strong>Email :</strong> ${user.email}
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 14px;">
          Si vous avez des questions, n'hesitez pas a nous contacter :<br>
          <strong>Email :</strong> manuel.harpon@teknopy.com<br>
          <strong>Telephone :</strong> +596 696 617 151
        </p>
        
        <p style="margin-top: 30px;">
          A tres bientot !<br>
          <strong>Manuel HARPON</strong><br>
          <em>TEKNOPY Concept - Le web au service de l'innovation</em>
        </p>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: user.email,
    subject: 'Bienvenue chez TEKNOPY Concept - Votre compte est pret',
    html,
  })
}

// Send notification to admin about new signup
export async function sendAdminNewSignupNotification(user: {
  email: string
  firstName: string
  lastName: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a5f2a; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0;">Nouvelle inscription</h2>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
        <p><strong>Un nouvel utilisateur s'est inscrit sur TEKNOPY Concept :</strong></p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nom :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.firstName} ${user.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Date :</strong></td>
            <td style="padding: 10px;">${new Date().toLocaleString('fr-FR')}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://www.plistech.com/admin" 
             style="background: #1a5f2a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Voir dans l'admin
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[TEKNOPY] Nouvelle inscription - ${user.firstName} ${user.lastName}`,
    html,
    replyTo: user.email,
  })
}

// Send notification about new project
export async function sendProjectCreatedEmail(project: {
  userEmail: string
  userName: string
  projectTitle: string
  serviceType: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a5f2a 0%, #2d8a3e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Votre projet a ete cree</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Bonjour <strong>${project.userName}</strong>,</p>
        
        <p>Votre demande de projet a bien ete enregistree :</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1a5f2a; margin: 20px 0;">
          <p style="margin: 0;"><strong>Projet :</strong> ${project.projectTitle}</p>
          <p style="margin: 10px 0 0;"><strong>Service :</strong> ${project.serviceType}</p>
        </div>
        
        <p>Notre equipe va etudier votre demande et vous recontactera dans les plus brefs delais.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.plistech.com/espace-client" 
             style="background: #1a5f2a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Suivre mon projet
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          L'equipe TEKNOPY Concept
        </p>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: project.userEmail,
    subject: `[TEKNOPY] Votre projet "${project.projectTitle}" a ete cree`,
    html,
  })
}

// Send notification to admin about new project
export async function sendAdminNewProjectNotification(project: {
  userEmail: string
  userName: string
  projectTitle: string
  serviceType: string
  description?: string
  budget?: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a5f2a; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0;">Nouveau projet client</h2>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Client :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project.userName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project.userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Projet :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project.projectTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project.serviceType}</td>
          </tr>
          ${project.budget ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Budget :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project.budget}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px;"><strong>Description :</strong></td>
            <td style="padding: 10px;">${project.description || 'Non renseignee'}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://www.plistech.com/admin" 
             style="background: #1a5f2a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Gerer le projet
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[TEKNOPY] Nouveau projet - ${project.projectTitle}`,
    html,
    replyTo: project.userEmail,
  })
}

// Send project status update
export async function sendProjectStatusUpdateEmail(project: {
  userEmail: string
  userName: string
  projectTitle: string
  oldStatus: string
  newStatus: string
  progress: number
}) {
  const statusLabels: Record<string, string> = {
    'pending': 'En attente',
    'in_progress': 'En cours',
    'review': 'En revision',
    'completed': 'Termine',
    'cancelled': 'Annule',
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a5f2a 0%, #2d8a3e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Mise a jour de votre projet</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Bonjour <strong>${project.userName}</strong>,</p>
        
        <p>Le statut de votre projet <strong>"${project.projectTitle}"</strong> a ete mis a jour :</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #666;">
            ${statusLabels[project.oldStatus] || project.oldStatus}
            <span style="margin: 0 15px; font-size: 20px;">→</span>
            <strong style="color: #1a5f2a; font-size: 18px;">${statusLabels[project.newStatus] || project.newStatus}</strong>
          </p>
          
          <div style="margin-top: 20px;">
            <p style="margin: 0 0 5px; font-size: 14px; color: #666;">Progression</p>
            <div style="background: #ddd; border-radius: 10px; height: 20px; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #1a5f2a, #2d8a3e); height: 100%; width: ${project.progress}%; transition: width 0.3s;"></div>
            </div>
            <p style="margin: 5px 0 0; font-weight: bold; color: #1a5f2a;">${project.progress}%</p>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.plistech.com/espace-client" 
             style="background: #1a5f2a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Voir les details
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          L'equipe TEKNOPY Concept
        </p>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: project.userEmail,
    subject: `[TEKNOPY] Votre projet "${project.projectTitle}" - ${statusLabels[project.newStatus] || project.newStatus}`,
    html,
  })
}

// Send new message notification
export async function sendNewMessageEmail(message: {
  recipientEmail: string
  recipientName: string
  senderName: string
  projectTitle: string
  messagePreview: string
  isAdmin: boolean
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a5f2a; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0;">Nouveau message</h2>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
        <p>Bonjour <strong>${message.recipientName}</strong>,</p>
        
        <p>Vous avez recu un nouveau message de <strong>${message.senderName}</strong> concernant le projet <strong>"${message.projectTitle}"</strong> :</p>
        
        <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #1a5f2a; margin: 20px 0;">
          <p style="margin: 0; color: #555; font-style: italic;">"${message.messagePreview}..."</p>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://www.plistech.com/${message.isAdmin ? 'admin' : 'espace-client'}" 
             style="background: #1a5f2a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Lire le message
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: message.recipientEmail,
    subject: `[TEKNOPY] Nouveau message - ${message.projectTitle}`,
    html,
  })
}
