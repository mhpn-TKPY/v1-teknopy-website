import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendNewMessageEmail, ADMIN_EMAIL } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { projectId, messageContent, recipientId } = await request.json()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get sender profile
    const { data: senderProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, is_admin')
      .eq('id', user.id)
      .single()

    const senderName = senderProfile 
      ? `${senderProfile.first_name} ${senderProfile.last_name}` 
      : 'TEKNOPY'
    const isFromAdmin = senderProfile?.is_admin || false

    // Get project info
    const { data: project } = await supabase
      .from('client_projects')
      .select('title, user_id')
      .eq('id', projectId)
      .single()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Determine recipient
    let recipientEmail: string
    let recipientName: string

    if (isFromAdmin) {
      // Admin sending to client - get client info
      const { data: clientProfile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', project.user_id)
        .single()

      const { data: clientAuth } = await supabase.auth.admin.getUserById(project.user_id)
      
      recipientEmail = clientAuth?.user?.email || ''
      recipientName = clientProfile 
        ? `${clientProfile.first_name} ${clientProfile.last_name}` 
        : 'Client'
    } else {
      // Client sending to admin
      recipientEmail = ADMIN_EMAIL
      recipientName = 'Manuel HARPON'
    }

    // Truncate message for preview
    const messagePreview = messageContent.length > 100 
      ? messageContent.substring(0, 100) 
      : messageContent

    await sendNewMessageEmail({
      recipientEmail,
      recipientName,
      senderName,
      projectTitle: project.title,
      messagePreview,
      isAdmin: !isFromAdmin, // The recipient needs to go to admin if sender is client
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Error sending message notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}
