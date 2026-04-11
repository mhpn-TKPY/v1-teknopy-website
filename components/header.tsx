"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, User, UserPlus, Home, Layers, FolderKanban, GraduationCap, Euro, FileText, ChevronUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mobileNavLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/#services", label: "Services", icon: Layers },
  { href: "/tarifs", label: "Tarifs", icon: Euro },
  { href: "/projets", label: "Realisations", icon: FolderKanban },
  { href: "/formations", label: "Formations", icon: GraduationCap },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* ===== MOBILE HEADER (default - mobile first) ===== */}
        <div className="lg:hidden">
          {/* Mobile: Single compact bar */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between px-4 py-2">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo-teknopy.png"
                  alt="TEKNOPY Concept"
                  width={100}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              
              {/* Mobile CTAs */}
              <div className="flex items-center gap-2">
                <a href="tel:+596696617151" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </a>
                <Button asChild size="sm" className="h-8 px-3 text-xs shadow-sm">
                  <Link href="/contact">
                    Devis
                  </Link>
                </Button>
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Bottom accent */}
            <div className="h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          </div>

          {/* Mobile menu dropdown */}
          <div className={cn(
            "bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-lg",
            mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="flex flex-col gap-1 px-4 py-4">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <link.icon className="h-4 w-4 text-primary" />
                  </div>
                  {link.label}
                </a>
              ))}
              
              <div className="my-2 h-px bg-border/50" />
              
              {/* Contact info */}
              <div className="flex flex-col gap-2 px-2">
                <a href="tel:+596696617151" className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  +596 696 617 151
                </a>
                <a href="mailto:manuel.harpon@teknopy.com" className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  manuel.harpon@teknopy.com
                </a>
              </div>
              
              {/* Mobile CTAs */}
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild variant="outline" className="gap-2 rounded-xl">
                  <Link href="/espace-client">
                    <User className="h-4 w-4" />
                    Espace Client
                  </Link>
                </Button>
                <Button asChild className="gap-2 rounded-xl shadow-md">
                  <Link href="/auth/inscription">
                    <UserPlus className="h-4 w-4" />
                    Inscription
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DESKTOP HEADER (lg+) ===== */}
        <div className="hidden lg:block">
          {/* Full header when not scrolled */}
          <div className={cn(
            "transition-all duration-500 overflow-hidden",
            isScrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
          )}>
            <div className="flex items-stretch h-[88px]">
              {/* Logo section - perfectly aligned with bands */}
              <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 min-w-[120px]">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/logo-teknopy.png"
                    alt="TEKNOPY Concept"
                    width={120}
                    height={80}
                    className="h-[80px] w-auto object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* Right section - stacked bands (same height as logo) */}
              <div className="flex flex-1 flex-col h-[88px]">
                {/* Top bar - green band */}
                <div className="h-[44px] bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  <div className="relative h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-sm">
                      <a href="tel:+596696617151" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                        <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                          <Phone className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-medium">+596 696 617 151</span>
                      </a>
                      <a href="mailto:manuel.harpon@teknopy.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                        <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                          <Mail className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-medium">manuel.harpon@teknopy.com</span>
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button asChild variant="secondary" size="sm" className="h-8 gap-1.5 text-xs font-semibold shadow-sm hover:shadow-md transition-all">
                        <Link href="/espace-client">
                          <User className="h-3.5 w-3.5" />
                          Espace Client
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="h-8 gap-1.5 text-xs font-semibold bg-white text-primary hover:bg-white/90 shadow-sm hover:shadow-md transition-all">
                        <Link href="/auth/inscription">
                          <UserPlus className="h-3.5 w-3.5" />
                          Inscription
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom bar - white/glass band */}
                <div className="h-[44px] relative bg-gradient-to-r from-slate-50/98 via-white to-slate-50/98 dark:from-slate-900/98 dark:via-slate-800 dark:to-slate-900/98 backdrop-blur-sm">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  
                  <div className="relative h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                      <Button asChild variant="outline" size="sm" className="gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/30 transition-all">
                        <Link href="/tarifs">
                          <Euro className="h-4 w-4 text-primary" />
                          Voir les Tarifs
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="gap-2 shadow-md hover:shadow-lg transition-all">
                        <Link href="/contact">
                          <FileText className="h-4 w-4" />
                          Demander un devis
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary/60" />
                      <span className="font-medium">Agence Web en Martinique</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact header when scrolled */}
          <div className={cn(
            "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-sm",
            isScrolled ? "max-h-14 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="flex items-center justify-between px-6 py-2">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/images/logo-teknopy.png"
                  alt="TEKNOPY"
                  width={80}
                  height={40}
                  className="h-10 w-auto transition-transform group-hover:scale-105"
                />
              </Link>

              <div className="flex items-center gap-4">
                <a href="tel:+596696617151" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium">+596 696 617 151</span>
                </a>
                <a href="mailto:manuel.harpon@teknopy.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium hidden xl:inline">manuel.harpon@teknopy.com</span>
                </a>
                <div className="h-5 w-px bg-border/50" />
                <Button asChild size="sm" className="h-8 gap-1.5 text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all animate-pulse hover:animate-none">
                  <Link href="/promos">
                    <Sparkles className="h-3.5 w-3.5" />
                    Promos
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs hover:bg-primary/5">
                  <Link href="/espace-client">
                    <User className="h-3.5 w-3.5" />
                    Espace Client
                  </Link>
                </Button>
                <Button asChild size="sm" className="h-8 gap-1.5 text-xs shadow-sm hover:shadow-md transition-all">
                  <Link href="/contact">
                    <FileText className="h-3.5 w-3.5" />
                    Devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer - mobile first */}
      <div className={cn(
        "transition-all duration-300",
        "h-14", // Mobile default
        "lg:h-0", // Desktop: managed by scroll
        isScrolled ? "lg:h-14" : "lg:h-[88px]"
      )} />

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-24 right-4 z-40 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110",
          "lg:bottom-20",
          !isVisible && isScrolled ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        )}
        aria-label="Retour en haut"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}
