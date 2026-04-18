"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary/20 select-none">404</div>
          <div className="relative -mt-16">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page introuvable
        </h1>
        <p className="text-muted-foreground mb-6">
          Desolee, la page que vous recherchez n&apos;existe pas ou a ete deplacee.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
          <Clock className="h-4 w-4 text-amber-600" />
          <span>
            Redirection automatique vers l&apos;accueil dans{" "}
            <span className="font-bold text-amber-600">{countdown}</span> secondes
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Retour a l&apos;accueil
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Page precedente
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground">
          TEKNOPY Concept - Agence Web en Martinique
        </p>
      </div>
    </div>
  )
}
