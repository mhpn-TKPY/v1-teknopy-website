import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send welcome email to the user who just signed up
    // Admin notification is not needed - admin can check Resend dashboard
    const result = await sendWelcomeEmail({
      email,
      firstName,
      lastName,
    })

    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? `Email de bienvenue envoye a ${email}` 
        : 'Erreur lors de l\'envoi',
    })
  } catch (error) {
    console.error('[API] Error sending welcome email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
