import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { 
  sendProjectCreatedEmail, 
  sendAdminNewProjectNotification,
  sendProjectStatusUpdateEmail 
} from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { 
      type, 
      projectId, 
      projectTitle, 
      serviceType,
      description,
      budget,
      oldStatus,
      newStatus,
      progress
    } = await request.json()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single()

    const userName = profile ? `${profile.first_name} ${profile.last_name}` : 'Client'

    if (type === 'project_created') {
      // Send email to user
      await sendProjectCreatedEmail({
        userEmail: user.email!,
        userName,
        projectTitle,
        serviceType,
      })

      // Send notification to admin
      await sendAdminNewProjectNotification({
        userEmail: user.email!,
        userName,
        projectTitle,
        serviceType,
        description,
        budget,
      })

      return NextResponse.json({ success: true })
    }

    if (type === 'status_update') {
      await sendProjectStatusUpdateEmail({
        userEmail: user.email!,
        userName,
        projectTitle,
        oldStatus,
        newStatus,
        progress: progress || 0,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('[API] Error sending project notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}
