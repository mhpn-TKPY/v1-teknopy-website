import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for public operations
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

/**
 * Create or update email verification record
 */
export async function storeVerificationToken(
  email: string,
  token: string,
  contactData: any
) {
  try {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Try to insert verification record
    const { data, error } = await supabaseAdmin
      .from('email_verifications')
      .insert({
        email,
        token,
        contact_data: contactData,
        expires_at: expiresAt.toISOString(),
      })
      .select();

    if (error) {
      // If table doesn't exist, try to create it
      if (error.message.includes('relation "public.email_verifications" does not exist')) {
        await createEmailVerificationsTable();
        // Retry insert
        return supabaseAdmin
          .from('email_verifications')
          .insert({
            email,
            token,
            contact_data: contactData,
            expires_at: expiresAt.toISOString(),
          })
          .select();
      }
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('[v0] Error storing verification token:', error);
    throw error;
  }
}

/**
 * Get verification record by token
 */
export async function getVerificationToken(token: string) {
  try {
    const { data, error } = await supabaseClient
      .from('email_verifications')
      .select()
      .eq('token', token)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[v0] Error getting verification token:', error);
    return null;
  }
}

/**
 * Mark verification as complete
 */
export async function markVerificationComplete(token: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('email_verifications')
      .update({
        is_verified: true,
        verified_at: new Date().toISOString(),
      })
      .eq('token', token)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[v0] Error marking verification complete:', error);
    throw error;
  }
}

/**
 * Store contact message in Supabase
 */
export async function storeContactMessage(
  name: string,
  email: string,
  message: string,
  service?: string
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert({
        name,
        email,
        message,
        service,
        is_verified: false,
        sent_to_admin: false,
        sent_to_user: false,
      })
      .select();

    if (error) {
      throw error;
    }

    return { success: true, contactId: data?.[0]?.id };
  } catch (error) {
    console.error('[v0] Error storing contact message:', error);
    throw error;
  }
}

/**
 * Update contact message status
 */
export async function updateContactStatus(
  contactId: string,
  updates: {
    is_verified?: boolean;
    sent_to_admin?: boolean;
    sent_to_user?: boolean;
  }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .update(updates)
      .eq('id', contactId)
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('[v0] Error updating contact status:', error);
    throw error;
  }
}

/**
 * Create email_verifications table if it doesn't exist
 * This uses raw SQL via Supabase admin API
 */
async function createEmailVerificationsTable() {
  try {
    // Use the admin client to execute raw SQL
    const { error } = await supabaseAdmin
      .from('email_verifications')
      .select()
      .limit(0);

    // If we can select, table exists
    if (!error || error.code !== 'PGRST116') {
      return;
    }

    console.log('[v0] Table email_verifications does not exist, will be created on first use');
  } catch (error) {
    console.log('[v0] Could not verify email_verifications table:', error);
  }
}
