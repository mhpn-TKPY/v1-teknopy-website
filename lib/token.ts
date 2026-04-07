import crypto from 'crypto';

/**
 * Generate a cryptographically secure token for email verification
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verify token hasn't expired (24 hours)
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Generate magic link URL
 */
export function generateMagicLink(token: string, baseUrl: string): string {
  return `${baseUrl}/verify-email?token=${token}`;
}
