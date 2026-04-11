'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Eye,
  Edit,
  Send,
  RefreshCw
} from 'lucide-react'

interface AdminDashboardProps {
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
  validated_at: string | null
  completed_at: string | null
  profiles?: {
    first_name: string | null
    last_name: string | null
    email: string | null
  }
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

export function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null)
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  
  // Form state for editing project
  const [editStatus, setEditStatus] = useState<string>('')
  const [editProgress, setEditProgress] = useState<number>(0)
  const [editNotes, setEditNotes] = useState<string>('')

  const firstName = user.user_metadata?.first_name || 'Admin'

  // Fetch all projects
  const fetchProjects = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('client_projects')
      .select(`
        *,
        profiles:user_id (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProjects(data)
    }
    setIsLoading(false)
  }

  // Fetch messages for a project
  const fetchMessages = async (projectId: string) => {
    const { data, error } = await supabase
      .from('client_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })
    
    if (!error && data) {
      setMessages(data)
      // Mark unread messages as read
      await supabase
        .from('client_messages')
        .update({ is_read: true })
        .eq('project_id', projectId)
        .eq('is_from_admin', false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      fetchMessages(selectedProject.id)
      setEditStatus(selectedProject.status)
      setEditProgress(selectedProject.progress)
      setEditNotes(selectedProject.admin_notes || '')
    }
  }, [selectedProject])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleUpdateProject = async () => {
    if (!selectedProject) return
    setIsUpdating(true)

    const updates: Partial<ClientProject> = {
      status: editStatus as ClientProject['status'],
      progress: editProgress,
      admin_notes: editNotes,
      updated_at: new Date().toISOString()
    }

    if (editStatus === 'validated' && selectedProject.status === 'pending') {
      updates.validated_at = new Date().toISOString()
    }
    if (editStatus === 'completed') {
      updates.completed_at = new Date().toISOString()
      updates.progress = 100
    }

    const { error } = await supabase
      .from('client_projects')
      .update(updates)
      .eq('id', selectedProject.id)

    if (!error) {
      await fetchProjects()
      setSelectedProject(prev => prev ? { ...prev, ...updates } : null)
    }
    setIsUpdating(false)
  }

  const handleSendMessage = async () => {
    if (!selectedProject || !newMessage.trim()) return

    const { error } = await supabase
      .from('client_messages')
      .insert({
        project_id: selectedProject.id,
        sender_id: user.id,
        content: newMessage.trim(),
        is_from_admin: true
      })

    if (!error) {
      setNewMessage('')
      await fetchMessages(selectedProject.id)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">En attente</Badge>
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

  const pendingCount = projects.filter(p => p.status === 'pending').length
  const inProgressCount = projects.filter(p => p.status === 'in_progress' || p.status === 'validated').length
  const completedCount = projects.filter(p => p.status === 'completed').length

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <LayoutDashboard className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  Dashboard Admin
                </h1>
                <p className="text-muted-foreground">
                  Gestion des projets et des clients TEKNOPY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {pendingCount > 0 && (
                <Badge variant="destructive" className="gap-1 px-3 py-1">
                  <Bell className="h-4 w-4" />
                  {pendingCount} nouvelle(s) demande(s)
                </Badge>
              )}
              <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? 'Deconnexion...' : 'Se deconnecter'}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
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
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Termines</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total projets</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="pending" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  En attente ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="active" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Actifs ({inProgressCount})
                </TabsTrigger>
                <TabsTrigger value="all" className="gap-2">
                  <FolderKanban className="h-4 w-4" />
                  Tous ({projects.length})
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" onClick={fetchProjects} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Actualiser
              </Button>
            </div>

            {/* Pending Projects */}
            <TabsContent value="pending" className="space-y-4">
              {projects.filter(p => p.status === 'pending').length === 0 ? (
                <Card className="p-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-4 font-semibold">Aucune demande en attente</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Toutes les demandes ont ete traitees
                  </p>
                </Card>
              ) : (
                projects.filter(p => p.status === 'pending').map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onView={() => {
                      setSelectedProject(project)
                      setShowProjectDialog(true)
                    }}
                    getStatusBadge={getStatusBadge}
                  />
                ))
              )}
            </TabsContent>

            {/* Active Projects */}
            <TabsContent value="active" className="space-y-4">
              {projects.filter(p => p.status === 'validated' || p.status === 'in_progress').map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onView={() => {
                    setSelectedProject(project)
                    setShowProjectDialog(true)
                  }}
                  getStatusBadge={getStatusBadge}
                />
              ))}
            </TabsContent>

            {/* All Projects */}
            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <Card className="p-12 text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Chargement...</p>
                </Card>
              ) : projects.length === 0 ? (
                <Card className="p-12 text-center">
                  <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">Aucun projet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les demandes de projets apparaitront ici
                  </p>
                </Card>
              ) : (
                projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onView={() => {
                      setSelectedProject(project)
                      setShowProjectDialog(true)
                    }}
                    getStatusBadge={getStatusBadge}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Project Detail Dialog */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedProject.title}
                  {getStatusBadge(selectedProject.status)}
                </DialogTitle>
                <DialogDescription>
                  Client: {selectedProject.profiles?.first_name} {selectedProject.profiles?.last_name} ({selectedProject.profiles?.email})
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4 md:grid-cols-2">
                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="mt-1">{selectedProject.description || 'Aucune description'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Service</Label>
                      <p className="mt-1 font-medium">{selectedProject.service_type}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Budget</Label>
                      <p className="mt-1 font-medium">{selectedProject.budget || 'Non specifie'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Deadline</Label>
                      <p className="mt-1 font-medium">{selectedProject.deadline || 'Non specifie'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Date demande</Label>
                      <p className="mt-1 font-medium">
                        {new Date(selectedProject.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="space-y-4 rounded-lg border p-4">
                    <h4 className="font-semibold">Gestion du projet</h4>
                    <div className="space-y-3">
                      <div>
                        <Label>Statut</Label>
                        <Select value={editStatus} onValueChange={setEditStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="validated">Valide</SelectItem>
                            <SelectItem value="in_progress">En cours</SelectItem>
                            <SelectItem value="completed">Termine</SelectItem>
                            <SelectItem value="rejected">Refuse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Progression ({editProgress}%)</Label>
                        <Input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={editProgress}
                          onChange={(e) => setEditProgress(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Notes admin</Label>
                        <Textarea 
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Notes internes..."
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={handleUpdateProject} 
                        disabled={isUpdating}
                        className="w-full"
                      >
                        {isUpdating ? 'Mise a jour...' : 'Mettre a jour'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col">
                  <Label className="mb-2">Messages</Label>
                  <div className="flex-1 space-y-3 rounded-lg border p-4 max-h-80 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-8">
                        Aucun message
                      </p>
                    ) : (
                      messages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`rounded-lg p-3 ${
                            msg.is_from_admin 
                              ? 'bg-primary/10 ml-4' 
                              : 'bg-muted mr-4'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {msg.is_from_admin ? 'Vous' : 'Client'} - {new Date(msg.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
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
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  )
}

// Project Card Component
function ProjectCard({ 
  project, 
  onView, 
  getStatusBadge 
}: { 
  project: ClientProject
  onView: () => void
  getStatusBadge: (status: string) => React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold">{project.title}</h3>
              {getStatusBadge(project.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              Client: {project.profiles?.first_name} {project.profiles?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              Service: {project.service_type} | Budget: {project.budget || 'Non specifie'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {project.status !== 'pending' && project.status !== 'rejected' && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progression</p>
                <p className="font-semibold">{project.progress}%</p>
              </div>
            )}
            <Button onClick={onView} className="gap-2">
              <Eye className="h-4 w-4" />
              Voir
            </Button>
          </div>
        </div>
        {project.status !== 'pending' && project.status !== 'rejected' && (
          <div className="h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
