"use client"

import Image from "next/image"
import { ArrowRight, Code2, Laptop, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Technologies extraites du CV
const technologies = [
  { name: "React", color: "bg-cyan-500/20 text-cyan-700 border-cyan-500/30" },
  { name: "Next.js", color: "bg-neutral-500/20 text-neutral-700 border-neutral-500/30" },
  { name: "Angular", color: "bg-red-500/20 text-red-700 border-red-500/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-700 border-blue-500/30" },
  { name: "Python", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30" },
  { name: "PHP", color: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30" },
  { name: "WordPress", color: "bg-sky-500/20 text-sky-700 border-sky-500/30" },
  { name: "Docker", color: "bg-blue-600/20 text-blue-700 border-blue-600/30" },
  { name: "AWS", color: "bg-orange-500/20 text-orange-700 border-orange-500/30" },
  { name: "Azure", color: "bg-blue-400/20 text-blue-600 border-blue-400/30" },
  { name: "GCP", color: "bg-red-400/20 text-red-600 border-red-400/30" },
  { name: "MongoDB", color: "bg-green-500/20 text-green-700 border-green-500/30" },
  { name: "MySQL", color: "bg-blue-500/20 text-blue-700 border-blue-500/30" },
  { name: "Firebase", color: "bg-amber-500/20 text-amber-700 border-amber-500/30" },
  { name: "Kubernetes", color: "bg-blue-600/20 text-blue-700 border-blue-600/30" },
  { name: "Jenkins", color: "bg-red-600/20 text-red-700 border-red-600/30" },
  { name: "Terraform", color: "bg-purple-500/20 text-purple-700 border-purple-500/30" },
  { name: "GitLab CI/CD", color: "bg-orange-600/20 text-orange-700 border-orange-600/30" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-10 pt-8 md:pb-14 md:pt-12 lg:pb-16 lg:pt-14">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo TEKNOPY Création */}
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/logo-teknopy.png"
              alt="TEKNOPY Création - L'innovation au service du web"
              width={180}
              height={132}
              className="h-20 w-auto md:h-24 lg:h-28"
              priority
            />
            <p className="mt-2 text-sm font-medium text-muted-foreground">L&apos;innovation au service du web</p>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Code2 className="h-4 w-4" aria-hidden="true" />
            <span>Agence Web en Martinique</span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Le Web au Service de{" "}
            <span className="text-primary">l&apos;Innovation</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Développement web sur mesure, consulting IT et formations informatiques pour entreprises, associations et particuliers en Martinique.
          </p>

          {/* Nuage de technologies avec animation */}
          <div className="mx-auto mb-8 max-w-3xl">
            <p className="mb-4 text-sm font-medium text-muted-foreground">Technologies maîtrisées</p>
            <div className="flex flex-wrap justify-center gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={tech.name}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-110 hover:shadow-md ${tech.color}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <a href="#contact">
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projets">Voir nos réalisations</a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-12 lg:gap-6">
          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4 text-center shadow-sm md:p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
              <Laptop className="h-5 w-5 text-primary md:h-6 md:w-6" />
            </div>
            <span className="text-2xl font-bold text-foreground md:text-3xl">50+</span>
            <span className="text-xs text-muted-foreground md:text-sm">Projets Réalisés</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4 text-center shadow-sm md:p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 md:h-12 md:w-12">
              <Users className="h-5 w-5 text-accent md:h-6 md:w-6" />
            </div>
            <span className="text-2xl font-bold text-foreground md:text-3xl">30+</span>
            <span className="text-xs text-muted-foreground md:text-sm">Clients Satisfaits</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4 text-center shadow-sm md:p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
              <Code2 className="h-5 w-5 text-primary md:h-6 md:w-6" />
            </div>
            <span className="text-2xl font-bold text-foreground md:text-3xl">5+</span>
            <span className="text-xs text-muted-foreground md:text-sm">Années d&apos;Expérience</span>
          </div>
        </div>
      </div>
    </section>
  )
}
