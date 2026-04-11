'use client'

import { useState, useEffect } from 'react'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// Note: SelectItem still used for budget selection
import {
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Plus,
  User as UserIcon,
  Mail,
  Phone,
  Send,
  Lock,
  RefreshCw
} from 'lucide-react'
import { WelcomePopup } from '@/components/welcome-popup'
import { ServiceSelector, type SelectedService } from '@/components/service-selector'

interface ClientDashboardProps {
  user: User
}

interface ClientProject {
  id: string
  user_id: string
  title: string
  description: string | null
  service_type: string
  budget: string | null
  deadline: string | null
  status: 'pending' | 'validated' | 'in_progress' | 'completed' | 'rejected'
  progress: number
  admin_notes: string | null
  created_at: string
  updated_at: string
}

interface ClientMessage {
  id: string
  project_id: string
  sender_id: string
  content: string
  is_from_admin: boolean
  is_read: boolean
  created_at: string
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null)
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // New project form state
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectServices, setProjectServices] = useState<SelectedService[]>([])
  const [projectEstimatedTotal, setProjectEstimatedTotal] = useState('')
  const [projectBudget, setProjectBudget] = useState('')
  const [projectDeadline, setProjectDeadline] = useState('')
  
  const firstName = user.user_metadata?.first_name || 'Client'
  const lastName = user.user_metadata?.last_name || ''

  // Check if user can create a new project
  const canCreateProject = !projects.some(p => 
    p.status === 'pending' || p.status === 'validated' || p.status === 'in_progress'
  )

  // Fetch user's projects
  const fetchProjects = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('client_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProjects(data)
      // Auto-select the active project if exists
      const activeProject = data.find(p => p.status === 'validated' || p.status === 'in_progress')
      if (activeProject) {
        setSelectedProject(activeProject)
      }
    }
    setIsLoading(false)
  }

  // Fetch messages for selected project
  const fetchMessages = async (projectId: string) => {
    const { data, error } = await supabase
      .from('client_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })
    
    if (!error && data) {
      setMessages(data)
      // Mark unread admin messages as read
      await supabase
        .from('client_messages')
        .update({ is_read: true })
        .eq('project_id', projectId)
        .eq('is_from_admin', true)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      fetchMessages(selectedProject.id)
    }
  }, [selectedProject])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

const handleCreateProject = async () => {
  if (!projectTitle || projectServices.length === 0) return
  setIsSubmitting(true)
  
  // Format services for database
  const servicesText = projectServices.map(s => `${s.name} (${s.price})`).join(', ')
  
  const { error } = await supabase
  .from('client_projects')
  .insert({
  user_id: user.id,
  title: projectTitle,
  description: projectDescription || null,
  service_type: servicesText,
  budget: projectEstimatedTotal || projectBudget || null,
  deadline: projectDeadline || null
  })

    if (!error) {
      // Send email notifications via Resend
      try {
        await fetch('/api/client/notify-project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'project_created',
            projectTitle,
            serviceType: servicesText,
            description: projectDescription,
            budget: projectEstimatedTotal || projectBudget,
          }),
        })
      } catch {
        // Email error should not block project creation
      }
      
      // Reset form
      setProjectTitle('')
      setProjectDescription('')
      setProjectServices([])
      setProjectEstimatedTotal('')
      setProjectBudget('')
      setProjectDeadline('')
      setShowNewProjectDialog(false)
      await fetchProjects()
    }
    setIsSubmitting(false)
  }

  const handleSendMessage = async () => {
    if (!selectedProject || !newMessage.trim()) return
    
    // Check if project is validated or in_progress
    if (selectedProject.status !== 'validated' && selectedProject.status !== 'in_progress') {
      return
    }

    const { error } = await supabase
      .from('client_messages')
      .insert({
        project_id: selectedProject.id,
        sender_id: user.id,
        content: newMessage.trim(),
        is_from_admin: false
      })

    if (!error) {
      // Send email notification via Resend
      try {
        await fetch('/api/client/notify-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: selectedProject.id,
            messageContent: newMessage.trim(),
          }),
        })
      } catch {
        // Email error should not block message sending
      }
      
      setNewMessage('')
      await fetchMessages(selectedProject.id)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">En attente de validation</Badge>
      case 'validated':
        return <Badge className="bg-blue-500/10 text-blue-600">Valide</Badge>
      case 'in_progress':
        return <Badge className="bg-primary/10 text-primary">En cours</Badge>
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600">Termine</Badge>
      case 'rejected':
        return <Badge variant="destructive">Refuse</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const activeProject = projects.find(p => p.status === 'validated' || p.status === 'in_progress')
  const pendingProject = projects.find(p => p.status === 'pending')
  const unreadMessages = messages.filter(m => m.is_from_admin && !m.is_read).length

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
              {isLoggingOut ? 'Deconnexion...' : 'Se deconnecter'}
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
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total projets</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingProject ? 1 : 0}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeProject ? 1 : 0}</p>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
                  <p className="text-sm text-muted-foreground">Termines</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="projets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="projets" className="gap-2">
                <FolderKanban className="h-4 w-4" />
                <span className="hidden sm:inline">Projets</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Messages</span>
                {unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {unreadMessages}
                  </Badge>
                )}
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
                <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" disabled={!canCreateProject}>
                      <Plus className="h-4 w-4" />
                      Nouveau projet
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Demande de nouveau projet</DialogTitle>
                      <DialogDescription>
                        Decrivez votre projet et nous vous contacterons rapidement.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="title">Titre du projet *</Label>
                        <Input 
                          id="title"
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                          placeholder="Ex: Site vitrine pour mon restaurant"
                        />
                      </div>
                      <div>
                        <Label>Services souhaites *</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Selectionnez un ou plusieurs services
                        </p>
                        <ServiceSelector
                          selectedServices={projectServices}
                          onServicesChange={setProjectServices}
                          onTotalChange={setProjectEstimatedTotal}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          placeholder="Decrivez votre projet en detail..."
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Budget estime</Label>
                          <Select value={projectBudget} onValueChange={setProjectBudget}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="moins-500">Moins de 500 EUR</SelectItem>
                              <SelectItem value="500-1000">500 - 1000 EUR</SelectItem>
                              <SelectItem value="1000-2000">1000 - 2000 EUR</SelectItem>
                              <SelectItem value="2000-5000">2000 - 5000 EUR</SelectItem>
                              <SelectItem value="plus-5000">Plus de 5000 EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="deadline">Deadline souhaitee</Label>
                          <Input 
                            id="deadline"
                            type="date"
                            value={projectDeadline}
                            onChange={(e) => setProjectDeadline(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleCreateProject} 
                        disabled={!projectTitle || projectServices.length === 0 || isSubmitting}
                      >
                        {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {!canCreateProject && (
                <Card className="border-orange-500/50 bg-orange-500/5">
                  <CardContent className="flex items-center gap-3 p-4">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      Vous ne pouvez pas creer de nouveau projet tant que votre projet actuel n&apos;est pas termine.
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {isLoading ? (
                <Card className="p-12 text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Chargement...</p>
                </Card>
              ) : projects.length === 0 ? (
                <Card className="p-12 text-center">
                  <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">Aucun projet pour le moment</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Demarrez votre premier projet avec TEKNOPY
                  </p>
                  <Button onClick={() => setShowNewProjectDialog(true)} className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Creer mon premier projet
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {projects.map((project) => (
                    <Card 
                      key={project.id} 
                      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardDescription>{project.service_type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {(project.status === 'validated' || project.status === 'in_progress' || project.status === 'completed') && (
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
                        )}
                        
                        {project.status === 'pending' && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            En attente de validation par TEKNOPY
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Demande: {new Date(project.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <h2 className="text-xl font-semibold">Messages</h2>
              
              {!selectedProject ? (
                <Card className="p-12 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">Selectionnez un projet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cliquez sur un projet dans l&apos;onglet Projets pour voir les messages
                  </p>
                </Card>
              ) : selectedProject.status === 'pending' ? (
                <Card className="p-12 text-center">
                  <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">Messagerie non disponible</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    La messagerie sera disponible une fois votre projet valide par TEKNOPY
                  </p>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                    <CardDescription>
                      Echangez avec TEKNOPY concernant votre projet
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Messages List */}
                    <div className="h-80 space-y-3 overflow-y-auto rounded-lg border p-4">
                      {messages.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-8">
                          Aucun message pour le moment. Commencez la conversation !
                        </p>
                      ) : (
                        messages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`rounded-lg p-3 ${
                              msg.is_from_admin 
                                ? 'bg-muted mr-8' 
                                : 'bg-primary/10 ml-8'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {msg.is_from_admin ? 'TEKNOPY' : 'Vous'} - {new Date(msg.created_at).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Send Message */}
                    {(selectedProject.status === 'validated' || selectedProject.status === 'in_progress') && (
                      <div className="flex gap-2">
                        <Input 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Ecrire un message..."
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Profil Tab */}
            <TabsContent value="profil" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Mon Profil</h2>
                <Button asChild variant="outline">
                  <Link href="/espace-client/profil">
                    <Settings className="h-4 w-4 mr-2" />
                    Gerer mon compte
                  </Link>
                </Button>
              </div>
              
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
                        <p className="text-sm text-muted-foreground">Email (identifiant)</p>
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
                    <div className="pt-2 border-t">
                      <Link 
                        href="/espace-client/profil" 
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Lock className="h-3 w-3" />
                        Modifier mon mot de passe
                      </Link>
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
                        <p className="text-sm text-muted-foreground">Votre interlocuteur dedie</p>
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
