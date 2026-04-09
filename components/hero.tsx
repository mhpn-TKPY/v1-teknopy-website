import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Laptop, Users, Phone, Mail, MapPin, Sparkles, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-8 md:pb-16 md:pt-12">
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

          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Le Web au Service de{" "}
            <span className="text-primary">l&apos;Innovation</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
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

          {/* Free Registration CTA */}
          <div className="mt-6">
            <Link 
              href="/auth/inscription" 
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-primary/30 bg-primary/10 px-6 py-3 shadow-lg transition-all hover:border-primary hover:bg-primary/20 hover:shadow-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-base font-semibold text-foreground">
                  Espace Client Gratuit
                </p>
                <p className="text-sm text-muted-foreground">
                  Suivez vos projets en temps reel
                </p>
              </div>
              <Badge className="ml-2 bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="mr-1 h-3 w-3" />
                Nouveau
              </Badge>
            </Link>
          </div>

          {/* Contact Card with Profile */}
          <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-start sm:p-5">
            <div className="relative">
              <div className="h-18 w-18 overflow-hidden rounded-full border-3 border-primary/20 shadow-md">
                <Image
                  src="/images/manuel-harpon-profile.jpg"
                  alt="Manuel Harpon - Fondateur de TEKNOPY Concept"
                  width={72}
                  height={72}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Code2 className="h-3 w-3" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-foreground">Manuel Harpon</h3>
              <p className="mb-2 text-sm text-muted-foreground">Fondateur & Developpeur Web</p>
              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="tel:+596696617151"
                  className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:justify-start"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +596 696 617 151
                </a>
                <a
                  href="mailto:contact@plistech.com"
                  className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:justify-start"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  contact@plistech.com
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
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-center shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Laptop className="h-4 w-4 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">50+</span>
            <span className="text-xs text-muted-foreground">Projets</span>
          </div>

          <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-center shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-4 w-4 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">30+</span>
            <span className="text-xs text-muted-foreground">Clients</span>
          </div>

          <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 text-center shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">5+</span>
            <span className="text-xs text-muted-foreground">Annees</span>
          </div>
        </div>
      </div>
    </section>
  )
}
