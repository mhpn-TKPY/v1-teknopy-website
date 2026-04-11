"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Sparkles, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const promoHighlights = [
  { text: "Site Vitrine 3 pages", price: "99EUR", originalPrice: "400EUR" },
  { text: "Offre Associatif", price: "19EUR/an", originalPrice: "99EUR" },
  { text: "Menu Restaurant", price: "79EUR/an", originalPrice: "149EUR" },
]

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if modal was already shown this session
    const shown = sessionStorage.getItem("welcome-modal-shown")
    if (shown) return

    // Show modal after a brief delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      sessionStorage.setItem("welcome-modal-shown", "true")
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4 transition-all duration-300",
        isClosing ? "opacity-0" : "opacity-100"
      )}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal - Mobile-first: bottom sheet style on mobile, centered on desktop */}
      <div
        className={cn(
          "relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300",
          isClosing 
            ? "translate-y-4 sm:scale-95 opacity-0" 
            : "translate-y-0 sm:scale-100 opacity-100"
        )}
      >
        {/* Gradient header accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-500 to-amber-500" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>

        {/* Content - Compact padding */}
        <div className="p-4 pt-6">
          {/* Header - Compact */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-2">
              <Sparkles className="h-3 w-3 text-amber-600" />
              <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Offres Martinique
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground">
              Bienvenue chez TEKNOPY
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sites web professionnels a prix reduits
            </p>
          </div>

          {/* Promo highlights - Compact */}
          <div className="space-y-1.5 mb-4">
            {promoHighlights.map((promo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{promo.text}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground line-through">{promo.originalPrice}</span>
                  <span className="text-sm font-bold text-primary">{promo.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons - Stacked on mobile */}
          <div className="flex flex-col gap-2">
            <Button
              asChild
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-md"
            >
              <Link href="/promos" onClick={handleClose}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Voir les offres
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Link href="/contact" onClick={handleClose}>
                Demander un devis
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-muted-foreground mt-3">
            1er RDV offert a Fort-de-France
          </p>
        </div>
      </div>
    </div>
  )
}
