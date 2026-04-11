"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Sparkles, ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const promoMessages = [
  { text: "Site Vitrine 3 pages", price: "99EUR", highlight: true },
  { text: "Offre Associatif", price: "19EUR/an", highlight: false },
  { text: "Menu Restaurant Digital", price: "79EUR/an", highlight: false },
  { text: "Sous-domaine offert 6 mois", price: "", highlight: true },
]

export function PromoTopStrip() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem("promo-top-strip-dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show with slight delay for attention-grabbing effect
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    // Rotate messages on mobile
    const rotateTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoMessages.length)
    }, 3000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(rotateTimer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsDismissed(true)
      sessionStorage.setItem("promo-top-strip-dismissed", "true")
    }, 300)
  }

  if (isDismissed) return null

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-500 ease-out",
        isVisible 
          ? "max-h-16 opacity-100" 
          : "max-h-0 opacity-0"
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
      
      {/* Sparkle overlay effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-white/20 rotate-12 animate-pulse" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/15 rotate-12 animate-pulse delay-150" />
        <div className="absolute top-0 left-3/4 w-1 h-full bg-white/20 rotate-12 animate-pulse delay-300" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-center py-2.5 gap-2 md:gap-4">
          {/* Icon with pulse */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="h-4 w-4 text-white/50" />
              </div>
            </div>
            <span className="text-white/90 text-xs font-medium uppercase tracking-wider">
              Offres Exclusives
            </span>
          </div>

          {/* Desktop: All promos */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {promoMessages.map((promo, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all",
                  promo.highlight 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "bg-transparent"
                )}
              >
                {promo.highlight && <Zap className="h-3 w-3 text-yellow-200" />}
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  {promo.text}
                </span>
                {promo.price && (
                  <span className="text-yellow-200 font-bold text-sm">
                    {promo.price}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Rotating single promo */}
          <div className="md:hidden flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-yellow-200 animate-pulse" />
            <div className="relative h-5 overflow-hidden">
              {promoMessages.map((promo, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 flex items-center gap-1.5 transition-all duration-500",
                    index === currentIndex 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-full opacity-0"
                  )}
                >
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {promo.text}
                  </span>
                  {promo.price && (
                    <span className="text-yellow-200 font-bold text-sm">
                      {promo.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/promos"
            className="flex items-center gap-1 px-3 py-1 bg-white text-amber-600 rounded-full text-xs font-bold hover:bg-yellow-100 transition-all hover:scale-105 shadow-lg"
          >
            <span className="hidden sm:inline">Voir</span> les offres
            <ArrowRight className="h-3 w-3" />
          </Link>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 md:right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fermer la banniere"
          >
            <X className="h-4 w-4 text-white/80 hover:text-white" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
