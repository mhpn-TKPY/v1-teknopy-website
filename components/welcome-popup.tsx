'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'

interface WelcomePopupProps {
  firstName: string
  onClose?: () => void
}

export function WelcomePopup({ firstName, onClose }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome = localStorage.getItem('teknopy_welcome_seen')
    if (!hasSeenWelcome) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('teknopy_welcome_seen', 'true')
    setIsOpen(false)
    onClose?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        {/* Header avec photo */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 pb-8">
          <div className="absolute right-4 top-4">
            <Sparkles className="h-6 w-6 text-primary/40" />
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src="/images/manuel-harpon-profile.jpg"
                  alt="Manuel Harpon - TEKNOPY"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Bienvenue {firstName} !
              </DialogTitle>
              <DialogDescription className="text-base">
                Je suis Manuel Harpon, fondateur de TEKNOPY Concept
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 pt-4">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Merci de votre confiance ! Votre espace client est maintenant actif. 
              Vous pouvez y suivre vos projets, consulter vos factures et me contacter directement.
            </p>
            
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-medium text-primary">
                Je suis disponible du lundi au samedi, de 10h à 21h pour vous accompagner dans vos projets digitaux.
              </p>
            </div>

            <Button onClick={handleClose} className="w-full gap-2" size="lg">
              Découvrir mon espace
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
