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
        {/* Full header when not scrolled */}
        <div className={cn(
          "transition-all duration-500 overflow-hidden",
          isScrolled ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
        )}>
          <div className="flex">
            {/* Logo section - aligned with both bands */}
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-6 py-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-teknopy.png"
                  alt="TEKNOPY Concept"
                  width={140}
                  height={88}
                  className="h-[88px] w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right section - stacked bands */}
            <div className="flex flex-1 flex-col">
              {/* Top bar - green band with gradient */}
              <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                </div>
                <div className="relative flex items-center justify-between px-4 py-2.5 sm:px-6">
                  <div className="flex items-center gap-4 text-sm">
                    <a href="tel:+596696617151" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                      <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                      <span className="hidden sm:inline font-medium">+596 696 617 151</span>
                    </a>
                    <a href="mailto:contact@plistech.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                      <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <span className="hidden md:inline font-medium">contact@plistech.com</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button asChild variant="secondary" size="sm" className="h-8 gap-1.5 text-xs font-semibold shadow-sm hover:shadow-md transition-shadow">
                      <Link href="/espace-client">
                        <User className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Espace Client</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="h-8 gap-1.5 text-xs font-semibold bg-white text-primary hover:bg-white/90 shadow-sm hover:shadow-md transition-shadow">
                      <Link href="/auth/inscription">
                        <UserPlus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Inscription</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom bar - futuristic glassmorphism design */}
              <div className="relative bg-gradient-to-r from-slate-50/95 via-white/98 to-slate-50/95 dark:from-slate-900/95 dark:via-slate-800/98 dark:to-slate-900/95 backdrop-blur-md">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                
                <div className="relative flex items-center justify-between px-4 py-2.5 sm:px-6">
                  <div className="hidden items-center gap-3 md:flex">
                    <Button asChild variant="outline" size="sm" className="gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/30 transition-all">
                      <Link href="/tarifs">
                        <Euro className="h-4 w-4 text-primary" />
                        Voir les Tarifs
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="gap-2 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-primary to-primary/90">
                      <Link href="/contact">
                        <FileText className="h-4 w-4" />
                        Demander un devis
                      </Link>
                    </Button>
                  </div>
                  <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
                    <Sparkles className="h-4 w-4 text-primary/60" />
                    <span className="font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      Agence Web en Martinique
                    </span>
                  </div>
                  
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="rounded-xl p-2.5 hover:bg-primary/10 transition-colors md:hidden ml-auto"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact header when scrolled - glassmorphism style */}
        <div className={cn(
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-500 overflow-hidden",
          isScrolled ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        )}>
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="flex items-center justify-between px-4 py-2 sm:px-6">
            {/* Mini logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo-teknopy.png"
                alt="TEKNOPY"
                width={80}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Compact CTAs */}
            <div className="hidden items-center gap-3 md:flex">
              <a href="tel:+596696617151" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="hidden lg:inline font-medium">+596 696 617 151</span>
              </a>
              <div className="h-5 w-px bg-border/50" />
              <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs hover:bg-primary/5">
                <Link href="/espace-client">
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Espace Client</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="h-8 gap-1.5 text-xs shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-primary to-primary/90">
                <Link href="/contact">
                  <FileText className="h-3.5 w-3.5" />
                  Devis
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-xl p-2 hover:bg-primary/10 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu - modern glassmorphism style */}
        <div className={cn(
          "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl md:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {mobileNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-all hover:bg-primary/10 hover:text-primary hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border/50 pt-4 mt-2">
              <a href="tel:+596696617151" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm hover:bg-muted/50 transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                +596 696 617 151
              </a>
              <a href="mailto:contact@plistech.com" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm hover:bg-muted/50 transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                contact@plistech.com
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" className="gap-2 rounded-xl">
                <Link href="/espace-client">
                  <User className="h-4 w-4" />
                  Espace Client
                </Link>
              </Button>
              <Button asChild className="gap-2 rounded-xl shadow-md bg-gradient-to-r from-primary to-primary/90">
                <Link href="/contact">
                  <FileText className="h-4 w-4" />
                  Demander un devis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className={cn(
        "transition-all duration-500",
        isScrolled ? "h-14" : "h-[88px]"
      )} />

      {/* Scroll to top button - modern style */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-20 right-4 z-40 rounded-full bg-gradient-to-r from-primary to-primary/90 p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110",
          !isVisible && isScrolled ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        )}
        aria-label="Retour en haut"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}
