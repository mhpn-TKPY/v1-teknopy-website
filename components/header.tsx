"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, User, Home, Layers, FolderKanban, GraduationCap, Euro, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with contact info */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+596696617151" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-3.5 w-3.5" />
              +596 696 617 151
            </a>
            <a href="mailto:contact@plistech.com" className="flex items-center gap-2 hover:opacity-80">
              <Mail className="h-3.5 w-3.5" />
              contact@plistech.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary" size="sm" className="h-7 gap-1.5 text-xs">
              <Link href="/espace-client">
                <User className="h-3.5 w-3.5" />
                Espace Client
              </Link>
            </Button>
            <Button asChild size="sm" className="h-7 gap-1.5 text-xs bg-background text-foreground hover:bg-background/90">
              <Link href="/contact">
                <FileText className="h-3.5 w-3.5" />
                Devis Gratuit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main navigation - Logo only on desktop */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-teknopy.png"
            alt="TEKNOPY Concept"
            width={120}
            height={87}
            className="h-12 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop - Additional CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/tarifs">
              <Euro className="h-4 w-4" />
              Voir les Tarifs
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/contact">
              Demander un devis
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {mobileNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 text-primary" />
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border pt-4 mt-2">
              <a href="tel:+596696617151" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +596 696 617 151
              </a>
              <a href="mailto:contact@plistech.com" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
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
      )}
    </header>
  )
}
