import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// This route initializes the admin account
// Should only be called once during initial setup
// Protected by a secret key

const ADMIN_EMAIL = 'manuel.harpon@teknopy.com'
const ADMIN_FIRST_NAME = 'Manuel'
const ADMIN_LAST_NAME = 'Harpon'

export async function POST(request: Request) {
  try {
    // Check for setup secret key
    const { setupKey, password } = await request.json()
    
    const expectedKey = process.env.ADMIN_SETUP_KEY
    if (!expectedKey || setupKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Check if admin already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const adminExists = existingUser?.users?.some(u => u.email === ADMIN_EMAIL)

    if (adminExists) {
      // Update the existing admin user's password
      const existingAdmin = existingUser?.users?.find(u => u.email === ADMIN_EMAIL)
      if (existingAdmin) {
        await supabaseAdmin.auth.admin.updateUserById(existingAdmin.id, {
          password: password,
          email_confirm: true
        })
        
        // Ensure profile is_admin is set
        await supabaseAdmin
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', existingAdmin.id)

        return NextResponse.json({
          success: true,
          message: 'Admin account updated successfully',
          email: ADMIN_EMAIL
        })
      }
    }

    // Create new admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: password,
      email_confirm: true,
      user_metadata: {
        first_name: ADMIN_FIRST_NAME,
        last_name: ADMIN_LAST_NAME
      }
    })

    if (createError) {
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      )
    }

    // Set admin flag in profiles
    if (newUser?.user) {
      await supabaseAdmin
        .from('profiles')
        .update({ 
          is_admin: true,
          first_name: ADMIN_FIRST_NAME,
          last_name: ADMIN_LAST_NAME
        })
        .eq('id', newUser.user.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      email: ADMIN_EMAIL
    })

  } catch (error) {
    console.error('Admin init error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
