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
    <div className="fixed bottom-28 right-4 z-40 max-w-[240px] lg:bottom-24">
      <div className="relative rounded-lg border border-border/30 bg-card/90 p-3 shadow-md backdrop-blur-sm">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        
        <div className="flex items-center gap-1.5 mb-1.5 pr-4">
          <Cookie className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">Cookies</span>
        </div>
        
        <p className="text-[11px] text-muted-foreground mb-2 leading-tight">
          Ce site utilise des cookies.{' '}
          <Link href="/politique-confidentialite" className="underline hover:text-primary">
            En savoir plus
          </Link>
        </p>
        
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefuse}
            className="flex-1 h-7 text-[10px] px-2"
          >
            Refuser
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 h-7 text-[10px] px-2"
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  )
}
