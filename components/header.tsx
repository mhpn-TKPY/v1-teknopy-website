"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#formations", label: "Formations" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with contact info */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-end gap-6 px-4 py-1.5 text-sm">
          <a href="tel:+596696617151" className="flex items-center gap-2 hover:opacity-80">
            <Phone className="h-3.5 w-3.5" />
            +596 696 617 151
          </a>
          <a href="mailto:manuel.harpon@teknopy.com" className="flex items-center gap-2 hover:opacity-80">
            <Mail className="h-3.5 w-3.5" />
            manuel.harpon@teknopy.com
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-teknopy.png"
            alt="TEKNOPY Concept"
            width={120}
            height={87}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild>
            <a href="#contact">Demander un devis</a>
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
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <a href="tel:+596696617151" className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                +596 696 617 151
              </a>
              <a href="mailto:manuel.harpon@teknopy.com" className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                manuel.harpon@teknopy.com
              </a>
            </div>
            <Button asChild className="mt-2">
              <a href="#contact">Demander un devis</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
