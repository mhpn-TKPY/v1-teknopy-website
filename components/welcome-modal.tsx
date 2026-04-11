"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Sparkles, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Official technology logos with CDN URLs
const technologies = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
]

const promoHighlights = [
  { text: "Site Vitrine 3 pages", price: "99EUR", originalPrice: "400EUR" },
  { text: "Offre Associatif", price: "19EUR/an", originalPrice: "99EUR" },
  { text: "Menu Restaurant Digital", price: "79EUR/an", originalPrice: "149EUR" },
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
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
        isClosing ? "opacity-0" : "opacity-100"
      )}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300",
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        {/* Gradient header accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-amber-500" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Offres Exclusives Martinique
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Bienvenue chez TEKNOPY
            </h2>
            <p className="text-sm text-muted-foreground">
              Agence web en Martinique - Sites professionnels a prix reduits
            </p>
          </div>

          {/* Promo highlights */}
          <div className="space-y-2 mb-6">
            {promoHighlights.map((promo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{promo.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground line-through">{promo.originalPrice}</span>
                  <span className="font-bold text-primary">{promo.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies section */}
          <div className="mb-6">
            <p className="text-xs text-center text-muted-foreground mb-3 uppercase tracking-wider">
              Technologies maitrisees
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 cursor-default"
                  title={tech.name}
                >
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={24}
                    height={24}
                    className="object-contain"
                    unoptimized
                  />
                  {/* Tooltip */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-medium bg-slate-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg"
            >
              <Link href="/promos" onClick={handleClose}>
                <Sparkles className="h-4 w-4 mr-2" />
                Voir les offres
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
            >
              <Link href="/contact" onClick={handleClose}>
                Demander un devis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Premier rendez-vous offert a Fort-de-France
          </p>
        </div>

        {/* Subtle animated border glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl opacity-50 animate-pulse" style={{
            background: "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent)",
            backgroundSize: "200% 100%",
          }} />
        </div>
      </div>
    </div>
  )
}
