import { NextResponse } from 'next/server'
import { sendWelcomeEmail, sendAdminNewSignupNotification } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send welcome email to user
    const userEmailResult = await sendWelcomeEmail({
      email,
      firstName,
      lastName,
    })

    // Send notification to admin
    const adminEmailResult = await sendAdminNewSignupNotification({
      email,
      firstName,
      lastName,
    })

    return NextResponse.json({
      success: true,
      userEmail: userEmailResult.success,
      adminEmail: adminEmailResult.success,
    })
  } catch (error) {
    console.error('[API] Error sending welcome email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
