import { NextResponse } from 'next/server';
import {
  sendVerificationEmail,
  sendAdminNotification,
  sendUserConfirmation,
} from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('[send-email] RESEND_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    let result;

    switch (type) {
      case 'verification':
        result = await sendVerificationEmail(
          data.email,
          data.name,
          data.magicLink
        );
        break;

      case 'admin-notification':
        result = await sendAdminNotification(data);
        break;

      case 'user-confirmation':
        result = await sendUserConfirmation(data);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[send-email] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
