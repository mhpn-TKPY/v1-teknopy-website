"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, User, UserPlus, Home, Layers, FolderKanban, GraduationCap, Euro, FileText } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - Contact info + CTAs (green band) */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Contact info */}
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
          
          {/* CTAs */}
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

      {/* Main bar - Large Logo (white band) */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Large Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-teknopy.png"
              alt="TEKNOPY Concept"
              width={200}
              height={145}
              className="h-16 w-auto sm:h-20 md:h-24"
              priority
            />
          </Link>

          {/* Desktop - Additional CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="outline" size="default" className="gap-2">
              <Link href="/tarifs">
                <Euro className="h-4 w-4" />
                Voir les Tarifs
              </Link>
            </Button>
            <Button asChild size="default" className="gap-2">
              <Link href="/contact">
                <FileText className="h-4 w-4" />
                Demander un devis
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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
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
                <Link href="/auth/inscription">
                  <UserPlus className="h-4 w-4" />
                  Inscription
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
