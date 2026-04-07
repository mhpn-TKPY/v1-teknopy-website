'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { sendAdminRecap, sendUserRecap } from '@/lib/web3forms-client'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token de vérification manquant')
      return
    }

    const verify = async () => {
      try {
        const url = new URL('/api/contact/verify', window.location.origin)
        url.searchParams.set('token', token)
        const res = await fetch(url.toString(), { method: 'GET', cache: 'no-store' })
        const data = await res.json()

        if (!res.ok) {
          setStatus('error')
          setMessage(data.error || 'Erreur lors de la vérification')
          return
        }

        if (data.alreadyVerified) {
          setStatus('success')
          setMessage(data.message)
          setEmail(data.email || '')
          setTimeout(() => router.push('/'), 4000)
          return
        }

        const { contactData, createdAt } = data
        await Promise.all([
          sendAdminRecap({ ...contactData, createdAt }),
          sendUserRecap({ ...contactData, createdAt }),
        ])

        setStatus('success')
        setMessage('Merci ! Votre email a été vérifié. Un récapitulatif vous a été envoyé et notre équipe a été notifiée.')
        setEmail(data.email || '')
        setTimeout(() => router.push('/'), 4000)
      } catch {
        setStatus('error')
        setMessage('Erreur lors de la vérification de votre email')
      }
    }

    verify()
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <h1 className="mb-2 text-xl font-semibold">Vérification en cours...</h1>
              <p className="text-sm text-muted-foreground">
                Veuillez patienter pendant que nous vérifions votre email
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="mb-2 text-xl font-semibold">Email vérifié !</h1>
              <p className="mb-4 text-sm text-muted-foreground">{message}</p>
              {email && (
                <p className="mb-4 text-xs text-muted-foreground">
                  Email confirmé : <span className="font-semibold">{email}</span>
                </p>
              )}
              <p className="text-xs text-muted-foreground">Redirection en cours...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="mb-2 text-xl font-semibold">Erreur de vérification</h1>
              <p className="mb-4 text-sm text-muted-foreground">{message}</p>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Retour à l&apos;accueil
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-xs text-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
          <p className="font-semibold mb-1">À propos de cette vérification</p>
          <p>
            Cette étape confirme que votre adresse email est valide et nous permet de vous envoyer un récapitulatif de votre demande.
          </p>
        </div>
      </div>
    </div>
  )
}

// useSearchParams() requires a Suspense boundary — Next.js build will fail without it.
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
