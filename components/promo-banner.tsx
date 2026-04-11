"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Utensils, Users, Star, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Ordered by ascending price: 19EUR -> 79EUR -> 149EUR
const promoOffers = [
  {
    id: "association",
    icon: Users,
    title: "Offre Associatif",
    description: "Site 1 page + sous-domaine",
    price: 19,
    originalPrice: 99,
    unit: "/an",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    href: "/promos#association",
  },
  {
    id: "restaurant",
    icon: Utensils,
    title: "Menu Restaurant Digital",
    description: "1 page + QR Code",
    price: 79,
    originalPrice: 149,
    unit: "/an",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    href: "/promos#restaurant",
  },
  {
    id: "influenceur",
    icon: Star,
    title: "Pack Influenceur",
    description: "Site + Blog + Galerie",
    price: 149,
    originalPrice: 299,
    unit: "",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    href: "/promos#influenceur",
  },
]

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem("promo-banner-dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show banner after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Rotate offers every 5 seconds
    const rotateTimer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % promoOffers.length)
    }, 5000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(rotateTimer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("promo-banner-dismissed", "true")
  }

  if (isDismissed) return null

  const offer = promoOffers[currentOffer]

  return (
    <>
      {/* Desktop: Fixed bottom banner */}
      <div
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block transition-all duration-500",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        )}
      >
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Gradient accent */}
          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", offer.color)} />
          
          <div className="flex items-center gap-4 px-6 py-4">
            {/* Sparkle icon */}
            <div className="flex-shrink-0">
              <div className={cn("p-3 rounded-xl bg-gradient-to-br", offer.color, "shadow-lg")}>
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Offers carousel */}
            <div className="flex items-center gap-6">
              {promoOffers.map((o, index) => (
                <Link
                  key={o.id}
                  href={o.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
                    index === currentOffer
                      ? cn(o.bgColor, "scale-105 shadow-md")
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 opacity-60 hover:opacity-100"
                  )}
                >
                  <o.icon className={cn("h-5 w-5", index === currentOffer ? o.textColor : "text-slate-400")} />
                  <div>
                    <p className={cn("text-sm font-semibold", index === currentOffer ? o.textColor : "text-slate-600")}>
                      {o.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className={cn("text-lg font-bold", index === currentOffer ? o.textColor : "text-slate-700")}>
                        {o.price}EUR{o.unit}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {o.originalPrice}EUR
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Button asChild size="sm" className={cn("bg-gradient-to-r shadow-lg hover:shadow-xl transition-all ml-2", offer.color)}>
              <Link href="/promos" className="gap-2">
                Voir les offres
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="ml-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Offer indicators */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {promoOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOffer(index)}
                className={cn(
                  "h-1 rounded-full transition-all",
                  index === currentOffer
                    ? cn("w-4 bg-gradient-to-r", promoOffers[index].color)
                    : "w-1 bg-slate-300"
                )}
                aria-label={`Offre ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Compact floating banner */}
      <div
        className={cn(
          "fixed bottom-20 left-4 right-4 z-50 lg:hidden transition-all duration-500",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        )}
      >
        <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", offer.color)} />
          
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", offer.color)}>
                  <offer.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-600">PROMO</span>
              </div>
              <button onClick={handleDismiss} className="p-1 rounded-full hover:bg-slate-100">
                <X className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-semibold", offer.textColor)}>{offer.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className={cn("text-xl font-bold", offer.textColor)}>
                    {offer.price}EUR{offer.unit}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {offer.originalPrice}EUR
                  </span>
                </div>
              </div>
              <Button asChild size="sm" className={cn("bg-gradient-to-r", offer.color)}>
                <Link href="/promos">
                  Voir
                </Link>
              </Button>
            </div>

            {/* Mobile indicators */}
            <div className="flex justify-center gap-1 mt-2">
              {promoOffers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOffer(index)}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    index === currentOffer
                      ? cn("w-3 bg-gradient-to-r", promoOffers[index].color)
                      : "w-1 bg-slate-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
