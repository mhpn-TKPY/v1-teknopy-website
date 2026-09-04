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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function InscriptionPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setIsLoading(false)
      return
    }

    try {
      // 1. Create user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })
      // Captured before the `error` discriminant narrows `data.user` to null.
      const createdUser = data?.user

      if (error) {
        console.log('[v0] Signup error:', error.message)
        // Ignore email sending errors from Supabase - we use Resend instead
        if (error.message.includes('sending confirmation email') || error.message.includes('Email rate limit')) {
          // Continue anyway - user is created, we'll send email via Resend
        } else if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          setError('Cette adresse email est déjà enregistrée. Veuillez vous connecter.')
          setIsLoading(false)
          return
        } else if (error.message.includes('Database error') || error.message.includes('database')) {
          // Database error during profile creation - try to continue if user was created
          console.log('[v0] Database error, checking if user was created...')
          if (!createdUser) {
            setError('Erreur lors de la création du compte. Veuillez réessayer.')
            setIsLoading(false)
            return
          }
          // User was created but profile might have failed - try to create profile manually.
          // is_admin volontairement absent : c'est une colonne protégée côté
          // base (trigger public.protect_is_admin, scripts/004_secure_is_admin.sql)
          // — la définir ici depuis le client n'aurait de toute façon aucun effet,
          // et laisser ce pattern trainer inviterait à le recopier ailleurs sans
          // la protection.
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: createdUser.id,
              first_name: firstName,
              last_name: lastName,
            }, { onConflict: 'id' })
          
          if (profileError) {
            console.log('[v0] Manual profile creation failed:', profileError)
          }
        } else if (!error.message.includes('email')) {
          setError(error.message)
          setIsLoading(false)
          return
        }
      }
      
      // 2. Send welcome email via Resend (Espace Client uses Resend, Vitrine uses Web3Forms)
      try {
        const emailResponse = await fetch('/api/auth/send-welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
          }),
        })
        const emailResult = await emailResponse.json()
        console.log('[v0] Welcome email sent:', emailResult)
      } catch (emailError) {
        console.log('[v0] Email sending failed:', emailError)
        // Email error should not block signup
      }
      
      router.push('/auth/inscription-reussie')
    } catch (error: unknown) {
      console.log('[v0] Unexpected error:', error)
      setError(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          
          <Card className="relative border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center">
              {/* Photo de profil avec message de bienvenue */}
              <div className="mx-auto relative">
                <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                  <Image
                    src="/images/manuel-harpon-moi2.jpg"
                    alt="Manuel Harpon - TEKNOPY"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserPlus className="h-4 w-4" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Bienvenue chez TEKNOPY</CardTitle>
                <CardDescription className="mt-2">
                  Je suis Manuel, votre interlocuteur dédié. Créez votre compte pour accéder à votre espace client personnalisé.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Prénom"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Nom"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 caractères"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="repeatPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="repeatPassword"
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showRepeatPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showRepeatPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Déjà un compte ?{' '}
                  <Link
                    href="/auth/connexion"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Se connecter
                  </Link>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-border">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à l&apos;accueil
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
