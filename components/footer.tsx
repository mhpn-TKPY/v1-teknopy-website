import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Globe } from "lucide-react"

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/projets", label: "Projets" },
  { href: "/formations", label: "Formations" },
  { href: "/contact", label: "Contact" },
  { href: "/espace-client", label: "Espace Client" },
]

const services = [
  "Sites Web Vitrine",
  "Applications Web",
  "Applications Mobiles",
  "E-commerce",
  "Consulting IT",
  "Formations",
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-teknopy.png"
                alt="TEKNOPY Concept"
                width={140}
                height={101}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Agence de développement web et consulting IT en Martinique. Le web au service de l&apos;innovation.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-primary" />
              <a href="https://www.teknopy.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                www.teknopy.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+596696617151"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +596 696 617 151
                </a>
              </li>
              <li>
                <a
                  href="mailto:manuel.harpon@teknopy.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  manuel.harpon@teknopy.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Fort-de-France, Martinique
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} TEKNOPY Concept. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
