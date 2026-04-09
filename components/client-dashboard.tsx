'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Euro,
  Calendar,
  Plus,
  ArrowRight,
  User as UserIcon,
  Mail,
  Phone
} from 'lucide-react'
import { WelcomePopup } from '@/components/welcome-popup'

interface ClientDashboardProps {
  user: User
}

// Mock data for demonstration
const mockProjects = [
  { 
    id: 1, 
    name: 'Site Vitrine Restaurant Le Marin', 
    status: 'en-cours', 
    progress: 65, 
    startDate: '2026-03-01',
    estimatedEnd: '2026-04-15',
    budget: 450
  },
  { 
    id: 2, 
    name: 'Refonte E-commerce Boutique Mode', 
    status: 'en-attente', 
    progress: 0, 
    startDate: '2026-04-20',
    estimatedEnd: '2026-06-01',
    budget: 1200
  },
]

const mockInvoices = [
  { id: 'FAC-2026-001', date: '2026-03-01', amount: 200, status: 'payee', project: 'Site Vitrine Restaurant' },
  { id: 'FAC-2026-002', date: '2026-03-15', amount: 250, status: 'en-attente', project: 'Site Vitrine Restaurant' },
]

const mockMessages = [
  { id: 1, subject: 'Validation maquette page accueil', date: '2026-04-05', read: false },
  { id: 2, subject: 'Choix des couleurs - confirmation', date: '2026-04-02', read: true },
]

export function ClientDashboard({ user }: ClientDashboardProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const firstName = user.user_metadata?.first_name || 'Client'
  const lastName = user.user_metadata?.last_name || ''
  
  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en-cours':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">En cours</Badge>
      case 'en-attente':
        return <Badge variant="secondary">En attente</Badge>
      case 'termine':
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Terminé</Badge>
      case 'payee':
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Payée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <WelcomePopup firstName={firstName} />
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  Bonjour, {firstName} {lastName}
                </h1>
                <p className="text-muted-foreground">
                  Bienvenue dans votre espace client TEKNOPY
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockProjects.length}</p>
                  <p className="text-sm text-muted-foreground">Projets actifs</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Euro className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">200 €</p>
                  <p className="text-sm text-muted-foreground">Total payé</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                  <MessageSquare className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Message non lu</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="projets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="projets" className="gap-2">
                <FolderKanban className="h-4 w-4" />
                <span className="hidden sm:inline">Projets</span>
              </TabsTrigger>
              <TabsTrigger value="factures" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Factures</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="profil" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
            </TabsList>

            {/* Projets Tab */}
            <TabsContent value="projets" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Mes Projets</h2>
                <Button asChild className="gap-2">
                  <Link href="/contact">
                    <Plus className="h-4 w-4" />
                    Nouveau projet
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        {getStatusBadge(project.status)}
                      </div>
                      <CardDescription>Budget : {project.budget} €</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div 
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Début : {new Date(project.startDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Fin estimée : {new Date(project.estimatedEnd).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {mockProjects.length === 0 && (
                <Card className="p-12 text-center">
                  <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">Aucun projet pour le moment</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Démarrez votre premier projet avec TEKNOPY
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Factures Tab */}
            <TabsContent value="factures" className="space-y-6">
              <h2 className="text-xl font-semibold">Mes Factures</h2>
              
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-4 text-left text-sm font-medium">N° Facture</th>
                          <th className="p-4 text-left text-sm font-medium">Date</th>
                          <th className="p-4 text-left text-sm font-medium">Projet</th>
                          <th className="p-4 text-left text-sm font-medium">Montant</th>
                          <th className="p-4 text-left text-sm font-medium">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b last:border-0">
                            <td className="p-4 font-medium">{invoice.id}</td>
                            <td className="p-4 text-muted-foreground">
                              {new Date(invoice.date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="p-4">{invoice.project}</td>
                            <td className="p-4 font-medium">{invoice.amount} €</td>
                            <td className="p-4">{getStatusBadge(invoice.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Mes Messages</h2>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/contact">
                    <Plus className="h-4 w-4" />
                    Nouveau message
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockMessages.map((message) => (
                  <Card key={message.id} className={`cursor-pointer transition-colors hover:bg-muted/50 ${!message.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        {!message.read && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                        <div>
                          <p className={`font-medium ${!message.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {message.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profil Tab */}
            <TabsContent value="profil" className="space-y-6">
              <h2 className="text-xl font-semibold">Mon Profil</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Nom complet</p>
                        <p className="font-medium">{firstName} {lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Membre depuis</p>
                        <p className="font-medium">
                          {new Date(user.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact TEKNOPY</CardTitle>
                    <CardDescription>Besoin d&apos;aide ? Contactez-nous</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full border-3 border-primary/30 shadow-lg ring-2 ring-primary/10">
                        <Image
                          src="/images/manuel-harpon-moi2.jpg"
                          alt="Manuel Harpon - Votre interlocuteur TEKNOPY"
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Manuel Harpon</p>
                        <p className="text-sm text-muted-foreground">Votre interlocuteur dédié</p>
                        <p className="text-xs text-primary">A votre service</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a 
                        href="tel:+596696617151" 
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        +596 696 617 151
                      </a>
                      <a 
                        href="mailto:manuel.harpon@teknopy.com" 
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <Mail className="h-4 w-4" />
                        manuel.harpon@teknopy.com
                      </a>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contact">Envoyer un message</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
