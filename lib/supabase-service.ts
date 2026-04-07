// CACHE_BUSTER_2026_04_07_v2 — pure Supabase, no email dependencies
import { createClient } from '@supabase/supabase-js';

// Lazy-initialized admin client to avoid module-level crashes
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || (!serviceKey && !anonKey)) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  }

  return createClient(url, serviceKey || anonKey!);
}

/**
 * Store verification token in verification_tokens table.
 * Schema: token, email, name, service, message, phone, expires_at, used
 */
export async function storeVerificationToken(
  token: string,
  contactData: {
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
  }
) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  const { error } = await getSupabaseAdmin()
    .from('verification_tokens')
    .insert({
      token,
      email: contactData.email,
      name: contactData.name,
      service: contactData.service,
      message: contactData.message,
      phone: contactData.phone || null,
      expires_at: expiresAt.toISOString(),
      used: false,
    });

  if (error) {
    console.error('[supabase] Error storing verification token:', error);
    throw new Error('Failed to store verification token');
  }

  return { success: true };
}

/**
 * Get a verification token record by token string.
 */
export async function getVerificationToken(token: string) {
  const { data, error } = await getSupabaseAdmin()
    .from('verification_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    console.error('[supabase] Error fetching verification token:', error);
    return null;
  }

  return data;
}

/**
 * Mark a verification token as used.
 */
export async function markVerificationComplete(token: string) {
  const { error } = await getSupabaseAdmin()
    .from('verification_tokens')
    .update({ used: true })
    .eq('token', token);

  if (error) {
    console.error('[supabase] Error marking token as used:', error);
    throw new Error('Failed to mark token as used');
  }

  return { success: true };
}

/**
 * Store verified contact in contacts table.
 * Schema: name, email, phone, service, message, verified, verified_at
 */
export async function storeContactMessage(
  data: {
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
  },
  verified = false
) {
  const { data: inserted, error } = await getSupabaseAdmin()
    .from('contacts')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      message: data.message,
      verified,
      verified_at: verified ? new Date().toISOString() : null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[supabase] Error storing contact message:', error);
    throw new Error('Failed to store contact message');
  }

  return { success: true, contactId: inserted?.id };
}
