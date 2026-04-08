"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token de vérification manquant.")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Votre email a été vérifié avec succès!")
        } else {
          setStatus("error")
          setMessage(data.error || "Une erreur est survenue lors de la vérification.")
        }
      } catch {
        setStatus("error")
        setMessage("Une erreur est survenue. Veuillez réessayer.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center">
        <Link href="/" className="inline-block mb-6">
          <Image
            src="/images/logo-teknopy.png"
            alt="Teknopy"
            width={150}
            height={50}
            className="mx-auto"
          />
        </Link>

        {status === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Vérification en cours...
            </h1>
            <p className="text-muted-foreground">
              Veuillez patienter pendant que nous vérifions votre email.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Email vérifié!
            </h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <p className="text-sm text-muted-foreground mb-6">
              Notre équipe vous contactera sous 24 heures ouvrées.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Erreur de vérification
            </h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
