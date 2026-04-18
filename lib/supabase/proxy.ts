import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Generate a cryptographically secure nonce for CSP
 * Uses Web Crypto API which is available in Edge Runtime
 */
function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

/**
 * Get security headers with CSP nonce
 * Based on security scan recommendations from RedSentinel and SecurityHeaders.com
 */
function getSecurityHeaders(nonce: string): Record<string, string> {
  // Content Security Policy with nonce (no unsafe-inline)
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://vercel.live https://va.vercel-scripts.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, // unsafe-inline needed for inline styles/Tailwind
    `img-src 'self' data: blob: https: http:`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.web3forms.com https://vercel.live https://va.vercel-scripts.com https://*.vercel-storage.com`,
    `frame-src 'self' https://vercel.live`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ')

  return {
    // Content Security Policy
    'Content-Security-Policy': csp,
    
    // Prevent clickjacking - DENY blocks all framing
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer Policy - strict but allows same-origin
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // HSTS - Force HTTPS with preload (2 years)
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // Permissions Policy - Disable unnecessary features
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    
    // XSS Protection (legacy but still useful)
    'X-XSS-Protection': '1; mode=block',
    
    // Cross-Origin policies
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    
    // CSP Nonce for scripts
    'x-nonce': nonce,
  }
}

export async function updateSession(request: NextRequest) {
  // Generate nonce for this request
  const nonce = generateNonce()
  
  // Get security headers
  const securityHeaders = getSecurityHeaders(nonce)
  
  let supabaseResponse = NextResponse.next({
    request,
    headers: new Headers(securityHeaders),
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
            headers: new Headers(securityHeaders),
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /espace-client routes
  if (
    request.nextUrl.pathname.startsWith('/espace-client') &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/connexion'
    const redirectResponse = NextResponse.redirect(url)
    
    // Add security headers to redirect response
    Object.entries(securityHeaders).forEach(([key, value]) => {
      redirectResponse.headers.set(key, value)
    })
    
    return redirectResponse
  }

  // Ensure security headers are set on the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    supabaseResponse.headers.set(key, value)
  })

  return supabaseResponse
}
