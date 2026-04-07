/**
 * Client-side email functions that call the /api/send-email route (Resend backend)
 */

/**
 * Send verification email with magic link to the user
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  magicLink: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'verification',
        email: userEmail,
        name: userName,
        magicLink,
      }),
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      console.error('Verification email error:', data.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Verification email exception:', error);
    return false;
  }
}

/**
 * Send admin notification and user confirmation after verification
 */
export async function sendRecapEmails(contactData: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
}): Promise<{ adminSent: boolean; userSent: boolean }> {
  const results = { adminSent: false, userSent: false };

  try {
    // Send admin notification
    const adminResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'admin-notification',
        ...contactData,
      }),
    });
    const adminData = await adminResponse.json();
    results.adminSent = adminResponse.ok && adminData.success;

    // Send user confirmation
    const userResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'user-confirmation',
        ...contactData,
      }),
    });
    const userData = await userResponse.json();
    results.userSent = userResponse.ok && userData.success;

  } catch (error) {
    console.error('Recap emails exception:', error);
  }

  return results;
}
