'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Cookie, Shield, Settings, X, ChevronDown, ChevronUp } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('teknopy_cookie_consent')
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    savePreferences(necessaryOnly)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('teknopy_cookie_consent', JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-2xl border-border/50 bg-card/95 shadow-2xl backdrop-blur-md">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Gestion des cookies</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="mr-1 h-3 w-3" />
                    RGPD
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Qualiopi
                  </Badge>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-muted-foreground">
            TEKNOPY Concept utilise des cookies pour améliorer votre expérience, analyser le trafic 
            et personnaliser le contenu. Conformément au RGPD et à notre engagement qualité Qualiopi, 
            vous pouvez choisir les cookies que vous acceptez.
          </p>

          {/* Cookie Details (collapsible) */}
          <div className="mb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Personnaliser mes choix
              </span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="necessary" className="font-medium">
                      Cookies essentiels
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Requis pour le fonctionnement du site (session, sécurité)
                    </p>
                  </div>
                  <Switch
                    id="necessary"
                    checked={preferences.necessary}
                    disabled
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="analytics" className="font-medium">
                      Cookies analytiques
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Nous aident à comprendre comment vous utilisez le site
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytics: checked })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="marketing" className="font-medium">
                      Cookies marketing
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Utilisés pour vous proposer des contenus pertinents
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={preferences.marketing}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, marketing: checked })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSavePreferences}
                  className="w-full mt-2"
                >
                  Enregistrer mes préférences
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={handleAcceptNecessary}
              className="flex-1"
            >
              Refuser les optionnels
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1"
            >
              Tout accepter
            </Button>
          </div>

          {/* Legal Links */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            En savoir plus sur notre{' '}
            <Link href="/politique-confidentialite" className="underline hover:text-primary">
              politique de confidentialité
            </Link>{' '}
            et nos{' '}
            <Link href="/mentions-legales" className="underline hover:text-primary">
              mentions légales
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
