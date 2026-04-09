import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Laptop, Users, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Sunset Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-sunset-martinique.jpg"
          alt="Coucher de soleil sur la Martinique"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Code2 className="h-4 w-4" />
            Agence Web en Martinique
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Le Web au Service de{" "}
            <span className="text-primary">l&apos;Innovation</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Développement web sur mesure, consulting IT et formations informatiques pour entreprises, associations et particuliers en Martinique.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/contact">
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projets">Voir nos réalisations</Link>
            </Button>
          </div>

          {/* Contact Card with Profile */}
          <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-white/20 bg-card/95 p-6 shadow-2xl backdrop-blur-md sm:flex-row sm:items-start">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
                <Image
                  src="/images/manuel-harpon-profile.jpg"
                  alt="Manuel Harpon - Fondateur de TEKNOPY Concept"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Manuel Harpon</h3>
              <p className="mb-3 text-sm text-muted-foreground">Fondateur & Développeur Web</p>
              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="tel:+596696617151"
                  className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:justify-start"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +596 696 617 151
                </a>
                <a
                  href="mailto:manuel.harpon@teknopy.com"
                  className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:justify-start"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  manuel.harpon@teknopy.com
                </a>
                <span className="inline-flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                  <MapPin className="h-4 w-4 text-primary" />
                  Fort-de-France, Martinique
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">50+</span>
            <span className="text-sm text-muted-foreground">Projets Réalisés</span>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-foreground">30+</span>
            <span className="text-sm text-muted-foreground">Clients Satisfaits</span>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">5+</span>
            <span className="text-sm text-muted-foreground">Années d&apos;Expérience</span>
          </div>
        </div>
      </div>
    </section>
  )
}
