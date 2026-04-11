import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/admin-dashboard'

export const metadata = {
  title: 'Admin Dashboard | TEKNOPY Concept',
  description: 'Dashboard administrateur TEKNOPY - Gestion des projets et clients',
}

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/connexion')
  }
  
  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  
  if (!profile?.is_admin) {
    redirect('/espace-client')
  }
  
  return <AdminDashboard user={user} />
}
