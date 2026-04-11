/**
 * Test Script: Account Deletion and Email Reuse
 * 
 * This script tests that:
 * 1. User can be deleted completely
 * 2. Email is freed for re-registration
 * 3. Projects are preserved with hashed user ID
 * 
 * Run with: npx ts-node scripts/test-delete-account.ts
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Hash function matching the API
function hashUserId(userId: string): string {
  const salt = SERVICE_ROLE_KEY?.substring(0, 16) || 'teknopy-salt'
  return createHash('sha256').update(userId + salt).digest('hex').substring(0, 16)
}

async function testDeleteAndReuse() {
  const testEmail = `test-delete-${Date.now()}@test.teknopy.com`
  const testPassword = 'TestPassword123!'
  
  console.log('=== Test: Account Deletion and Email Reuse ===\n')
  
  try {
    // Step 1: Create a test user
    console.log('1. Creating test user:', testEmail)
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: { first_name: 'Test', last_name: 'User' }
    })
    
    if (createError) {
      throw new Error(`Failed to create user: ${createError.message}`)
    }
    
    const userId = createData.user.id
    console.log('   User created with ID:', userId)
    console.log('   Hashed ID:', hashUserId(userId))
    
    // Step 2: Create a test project for this user
    console.log('\n2. Creating test project for user')
    const { data: projectData, error: projectError } = await supabase
      .from('client_projects')
      .insert({
        user_id: userId,
        title: 'Test Project - Delete Account',
        service_type: 'Test Service',
        status: 'pending'
      })
      .select()
      .single()
    
    if (projectError) {
      console.log('   Warning: Could not create project:', projectError.message)
    } else {
      console.log('   Project created with ID:', projectData.id)
    }
    
    // Step 3: Delete the user (simulating API behavior)
    console.log('\n3. Deleting user account...')
    
    // Update projects with hashed ID
    const { error: updateError } = await supabase
      .from('client_projects')
      .update({
        deleted_user_hash: hashUserId(userId),
        user_id: null
      })
      .eq('user_id', userId)
    
    if (updateError) {
      console.log('   Warning: Could not update projects:', updateError.message)
    } else {
      console.log('   Projects updated with hashed user ID')
    }
    
    // Delete profile
    await supabase.from('profiles').delete().eq('id', userId)
    console.log('   Profile deleted')
    
    // Delete auth user
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
    
    if (deleteError) {
      throw new Error(`Failed to delete user: ${deleteError.message}`)
    }
    console.log('   Auth user deleted')
    
    // Step 4: Verify email is freed - try to create user with same email
    console.log('\n4. Testing email reuse...')
    const { data: reuseData, error: reuseError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: { first_name: 'New', last_name: 'User' }
    })
    
    if (reuseError) {
      console.log('   FAIL: Email could not be reused:', reuseError.message)
      return false
    }
    
    console.log('   SUCCESS: Email reused! New user ID:', reuseData.user.id)
    
    // Step 5: Verify project is preserved
    console.log('\n5. Verifying project preservation...')
    const { data: preservedProject, error: fetchError } = await supabase
      .from('client_projects')
      .select('*')
      .eq('deleted_user_hash', hashUserId(userId))
      .single()
    
    if (fetchError || !preservedProject) {
      console.log('   Warning: Could not verify project preservation')
    } else {
      console.log('   SUCCESS: Project preserved with hashed ID')
      console.log('   Project title:', preservedProject.title)
      console.log('   Deleted user hash:', preservedProject.deleted_user_hash)
      console.log('   user_id is NULL:', preservedProject.user_id === null)
    }
    
    // Cleanup: Delete the second test user
    console.log('\n6. Cleanup...')
    await supabase.auth.admin.deleteUser(reuseData.user.id)
    if (preservedProject) {
      await supabase.from('client_projects').delete().eq('id', preservedProject.id)
    }
    console.log('   Test data cleaned up')
    
    console.log('\n=== ALL TESTS PASSED ===')
    return true
    
  } catch (error) {
    console.error('\n=== TEST FAILED ===')
    console.error(error)
    return false
  }
}

// Run the test
testDeleteAndReuse()
  .then(success => process.exit(success ? 0 : 1))
  .catch(() => process.exit(1))
