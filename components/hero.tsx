import Link from "next/link"
import { ArrowRight, Code2, Laptop, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
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
