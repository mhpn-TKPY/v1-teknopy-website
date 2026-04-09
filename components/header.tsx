"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, User, UserPlus, Home, Layers, FolderKanban, GraduationCap, Euro, FileText, ChevronDown } from "lucide-react"
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
      
      // Determine if we've scrolled past threshold
      setIsScrolled(currentScrollY > 50)
      
      // Show/hide based on scroll direction
      if (currentScrollY < 50) {
        // Always show at top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled ? "shadow-lg" : "",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* Full header when not scrolled */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isScrolled ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
        )}>
          <div className="flex">
            {/* Logo section - large */}
            <div className="flex items-center justify-center bg-background border-b border-r border-border/40 px-4 py-3 sm:px-6 md:px-8">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-teknopy.png"
                  alt="TEKNOPY Concept"
                  width={160}
                  height={100}
                  className="h-16 w-auto sm:h-20 md:h-24"
                  priority
                />
              </Link>
            </div>

            {/* Right section - stacked bands */}
            <div className="flex flex-1 flex-col">
              {/* Top bar - green band */}
              <div className="bg-primary text-primary-foreground">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                  <div className="flex items-center gap-4 text-sm">
                    <a href="tel:+596696617151" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">+596 696 617 151</span>
                    </a>
                    <a href="mailto:contact@plistech.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Mail className="h-4 w-4" />
                      <span className="hidden md:inline">contact@plistech.com</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button asChild variant="secondary" size="sm" className="h-8 gap-1.5 text-xs">
                      <Link href="/espace-client">
                        <User className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Espace Client</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="h-8 gap-1.5 text-xs bg-background text-foreground hover:bg-background/90">
                      <Link href="/auth/inscription">
                        <UserPlus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Inscription</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom bar - white band */}
              <div className="border-b border-border/40 bg-background">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                  <div className="hidden items-center gap-3 md:flex">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <Link href="/tarifs">
                        <Euro className="h-4 w-4" />
                        Voir les Tarifs
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="gap-2">
                      <Link href="/contact">
                        <FileText className="h-4 w-4" />
                        Demander un devis
                      </Link>
                    </Button>
                  </div>
                  <span className="hidden text-sm text-muted-foreground lg:block">
                    Agence Web en Martinique
                  </span>
                  
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="rounded-lg p-2 hover:bg-muted md:hidden ml-auto"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact header when scrolled */}
        <div className={cn(
          "bg-background/95 backdrop-blur-lg border-b border-border/40 transition-all duration-300 overflow-hidden",
          isScrolled ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="flex items-center justify-between px-4 py-2 sm:px-6">
            {/* Mini logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-teknopy.png"
                alt="TEKNOPY"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Compact CTAs */}
            <div className="hidden items-center gap-2 md:flex">
              <a href="tel:+596696617151" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">+596 696 617 151</span>
              </a>
              <div className="h-4 w-px bg-border mx-2" />
              <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                <Link href="/espace-client">
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Espace Client</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="h-8 gap-1.5 text-xs">
                <Link href="/contact">
                  <FileText className="h-3.5 w-3.5" />
                  Devis
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-muted md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "bg-background border-b border-border md:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {mobileNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 text-primary" />
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border pt-4 mt-2">
              <a href="tel:+596696617151" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +596 696 617 151
              </a>
              <a href="mailto:contact@plistech.com" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                contact@plistech.com
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/espace-client">
                  <User className="h-4 w-4" />
                  Espace Client
                </Link>
              </Button>
              <Button asChild className="gap-2">
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
        "transition-all duration-300",
        isScrolled ? "h-16" : "h-28 sm:h-32 md:h-36"
      )} />

      {/* Scroll to top indicator when header is hidden */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-20 right-4 z-40 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90",
          !isVisible && isScrolled ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        )}
        aria-label="Retour en haut"
      >
        <ChevronDown className="h-5 w-5 rotate-180" />
      </button>
    </>
  )
}
