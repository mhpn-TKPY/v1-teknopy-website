import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body
    
    // Debug: Log received data
    console.log('[API send-welcome-email] Received data:', { email, firstName, lastName })

    if (!email || !firstName || !lastName) {
      console.log('[API send-welcome-email] Missing fields:', { email: !!email, firstName: !!firstName, lastName: !!lastName })
      return NextResponse.json(
        { error: 'Missing required fields', received: { email: !!email, firstName: !!firstName, lastName: !!lastName } },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('[API send-welcome-email] Invalid email format:', email)
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send welcome email to the user who just signed up
    console.log('[API send-welcome-email] Sending email to:', email)
    const result = await sendWelcomeEmail({
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    })

    console.log('[API send-welcome-email] Resend result:', result)

    return NextResponse.json({
      success: result.success,
      sentTo: email,
      message: result.success 
        ? `Email de bienvenue envoye a ${email}` 
        : 'Erreur lors de l\'envoi',
      data: result.data,
      error: result.error,
    })
  } catch (error) {
    console.error('[API send-welcome-email] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: String(error) },
      { status: 500 }
    )
  }
}
