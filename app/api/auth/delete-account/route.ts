import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// Hash user ID for anonymized storage in projects (visible in admin dashboard)
function hashUserId(userId: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 16) || 'teknopy-salt'
  return createHash('sha256').update(userId + salt).digest('hex').substring(0, 16)
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorise' },
        { status: 401 }
      )
    }

    // Verify confirmation from request body
    const { confirmation } = await request.json()
    
    if (confirmation !== 'SUPPRIMER') {
      return NextResponse.json(
        { error: 'Confirmation invalide. Veuillez taper SUPPRIMER.' },
        { status: 400 }
      )
    }

    const userIdHash = hashUserId(user.id)

    // 1. Update projects: store hashed user ID and set user_id to NULL
    // This keeps project history with anonymized reference while freeing FK constraint
    const { error: projectsError } = await supabase
      .from('client_projects')
      .update({
        deleted_user_hash: userIdHash,
        user_id: null,
      })
      .eq('user_id', user.id)

    if (projectsError) {
      console.error('[delete-account] Projects update error:', projectsError)
      // Continue - project update is not blocking
    }

    // 2. Delete all user messages (personal/sensitive data)
    const { error: messagesError } = await supabase
      .from('client_messages')
      .delete()
      .eq('user_id', user.id)

    if (messagesError) {
      console.error('[delete-account] Messages delete error:', messagesError)
    }

    // 3. Delete profile from profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      console.error('[delete-account] Profile delete error:', profileError)
    }

    // 4. Delete user from auth.users using Admin API
    // This completely removes the user and FREES THE EMAIL for re-registration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[delete-account] Missing Supabase admin credentials')
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    const supabaseAdmin = createAdminClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id)

    if (deleteUserError) {
      console.error('[delete-account] Auth user delete error:', deleteUserError)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression. Contactez le support.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Compte supprime. Votre email peut etre reutilise pour une nouvelle inscription.',
      emailFreed: true,
      projectsPreserved: true,
    })
  } catch (error) {
    console.error('[delete-account] Error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du compte' },
      { status: 500 }
    )
  }
}
