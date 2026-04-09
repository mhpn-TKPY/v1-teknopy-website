import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ClientDashboard } from '@/components/client-dashboard'

export const metadata = {
  title: 'Espace Client',
  description: 'Votre tableau de bord personnel TEKNOPY - Suivez vos projets, factures et demandes.',
}

export default async function EspaceClientPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/auth/connexion')
  }

  return <ClientDashboard user={data.user} />
}
