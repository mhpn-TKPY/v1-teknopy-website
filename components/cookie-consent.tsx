'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('teknopy_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('teknopy_cookie_consent', JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
    }))
    setIsVisible(false)
  }

  const handleRefuse = () => {
    localStorage.setItem('teknopy_cookie_consent', JSON.stringify({
      accepted: false,
      timestamp: new Date().toISOString(),
    }))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[280px]">
      <div className="relative rounded-xl border border-border/50 bg-card/95 p-4 shadow-lg backdrop-blur-md">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-2 mb-2 pr-4">
          <Cookie className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Cookies</span>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">
          Ce site utilise des cookies.{' '}
          <Link href="/politique-confidentialite" className="underline hover:text-primary">
            En savoir plus
          </Link>
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefuse}
            className="flex-1 h-8 text-xs"
          >
            Refuser
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 h-8 text-xs"
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  )
}
