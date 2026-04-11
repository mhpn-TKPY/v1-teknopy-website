'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { 
  User, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Save, 
  Shield, 
  Trash2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface Profile {
  id: string
  first_name: string
  last_name: string
  is_admin: boolean
}

export default function ProfilPage() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/connexion')
        return
      }
      
      setUser({ id: user.id, email: user.email || '' })
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profileData) {
        setProfile(profileData)
        setFirstName(profileData.first_name || '')
        setLastName(profileData.last_name || '')
      }
      
      setIsLoading(false)
    }
    
    fetchUserAndProfile()
  }, [router, supabase])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setIsSavingProfile(true)
    setProfileError(null)
    setProfileSuccess(false)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        })
        .eq('id', user.id)
      
      if (error) throw error
      
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingPassword(true)
    setPasswordError(null)
    setPasswordSuccess(false)
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas')
      setIsSavingPassword(false)
      return
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caracteres')
      setIsSavingPassword(false)
      return
    }
    
    try {
      // Verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      })
      
      if (signInError) {
        setPasswordError('Le mot de passe actuel est incorrect')
        setIsSavingPassword(false)
        return
      }
      
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      
      if (error) throw error
      
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe')
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'SUPPRIMER') {
      setDeleteError('Veuillez taper SUPPRIMER pour confirmer')
      return
    }
    
    setIsDeleting(true)
    setDeleteError(null)
    
    try {
      // Call API to delete account (will anonymize user data but keep projects)
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la suppression')
      }
      
      // Sign out and redirect
      await supabase.auth.signOut()
      router.push('/?deleted=true')
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/espace-client"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour a l&apos;espace client
            </Link>
            <h1 className="text-3xl font-bold">Mon profil</h1>
            <p className="text-muted-foreground mt-2">
              Gerez vos informations personnelles et la securite de votre compte.
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Mettez a jour vos informations de profil</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prenom</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prenom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (identifiant)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="pl-10 bg-muted"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      L&apos;email est votre identifiant unique et ne peut pas etre modifie.
                    </p>
                  </div>
                  
                  {profileError && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {profileError}
                    </div>
                  )}
                  
                  {profileSuccess && (
                    <div className="rounded-md bg-primary/10 p-3 text-sm text-primary flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Profil mis a jour avec succes
                    </div>
                  )}
                  
                  <Button type="submit" disabled={isSavingProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSavingProfile ? 'Sauvegarde...' : 'Sauvegarder'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Securite</CardTitle>
                    <CardDescription>Modifiez votre mot de passe</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pl-10 pr-10"
                        placeholder="Votre mot de passe actuel"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10 pr-10"
                        placeholder="Minimum 6 caracteres"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        placeholder="Confirmez le mot de passe"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {passwordError && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {passwordError}
                    </div>
                  )}
                  
                  {passwordSuccess && (
                    <div className="rounded-md bg-primary/10 p-3 text-sm text-primary flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mot de passe modifie avec succes
                    </div>
                  )}
                  
                  <Button type="submit" disabled={isSavingPassword}>
                    <Lock className="h-4 w-4 mr-2" />
                    {isSavingPassword ? 'Modification...' : 'Changer le mot de passe'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-destructive">Zone de danger</CardTitle>
                    <CardDescription>Actions irreversibles sur votre compte</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-destructive/5 border border-destructive/20 p-4">
                  <h4 className="font-medium text-destructive mb-2">Supprimer mon compte</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cette action supprimera vos donnees personnelles (nom, email) de facon permanente. 
                    Vos projets seront conserves de maniere anonyme pour notre historique.
                  </p>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer mon compte
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Etes-vous absolument sur ?</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p>
                            Cette action est irreversible. Elle supprimera definitivement vos donnees personnelles.
                          </p>
                          <div className="rounded-md bg-muted p-3 text-sm">
                            <p className="font-medium mb-2">Ce qui sera supprime :</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Votre nom et prenom</li>
                              <li>Votre adresse email</li>
                              <li>Votre compte de connexion</li>
                            </ul>
                          </div>
                          <div className="rounded-md bg-primary/5 p-3 text-sm">
                            <p className="font-medium mb-2">Ce qui sera conserve (anonymise) :</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Vos projets et leur historique</li>
                              <li>Les messages echanges</li>
                            </ul>
                          </div>
                          <div className="pt-2">
                            <Label htmlFor="deleteConfirm" className="text-foreground">
                              Tapez <strong>SUPPRIMER</strong> pour confirmer
                            </Label>
                            <Input
                              id="deleteConfirm"
                              value={deleteConfirmation}
                              onChange={(e) => setDeleteConfirmation(e.target.value)}
                              className="mt-2"
                              placeholder="SUPPRIMER"
                            />
                          </div>
                          {deleteError && (
                            <p className="text-destructive text-sm">{deleteError}</p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>
                          Annuler
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting || deleteConfirmation !== 'SUPPRIMER'}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          {isDeleting ? 'Suppression...' : 'Supprimer definitivement'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
