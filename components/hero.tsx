"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Code2, Laptop, Users, Phone, Mail, MapPin, Sparkles, CarFront, X } from "lucide-react"
import { SchoolOffers } from "@/components/school-offers"

// Official technology logos
const techLogos = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
]

export function Hero() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <section className="relative overflow-hidden pb-10 pt-8 md:pb-16 md:pt-12">
      {showAlert && (
        <div role="status" aria-live="polite" className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-primary/30 bg-card p-3 shadow-2xl md:bottom-6 md:left-auto md:right-6">
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CarFront className="size-6 motion-safe:animate-pulse" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 size-2.5 motion-safe:animate-ping rounded-full bg-accent" aria-hidden="true" />
          </div>
          <p className="flex-1 text-sm leading-5 text-foreground"><span className="font-semibold">Nouvelles offres cours &amp; code</span><br /><span className="text-muted-foreground">Stages vacances et accompagnement Première disponibles.</span></p>
          <button type="button" onClick={() => setShowAlert(false)} aria-label="Fermer l'alerte" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="size-4" /></button>
        </div>
      )}
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
          {/* Animated Promo Banner - Above TEKNOPY Concept */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg motion-safe:animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Cours Première &amp; code · dès 25 € · offres vacances</span>
            <Link href="/promos" className="ml-1 underline underline-offset-2 hover:no-underline text-sm font-bold">
              Voir offres
            </Link>
          </div>

          {/* Logo + TEKNOPY Concept - Bigger than subtitle */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <Image
              src="/images/logo-teknopy.png"
              alt="TEKNOPY Concept"
              width={48}
              height={48}
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              TEKNOPY <span className="text-primary">Concept</span>
            </span>
          </div>

          <h1 className="mb-4 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Le Web au Service de{" "}
            <span className="text-primary">l&apos;Innovation</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Développement web sur mesure, consulting IT et formations informatiques pour entreprises, associations et particuliers en Martinique.
          </p>

          <SchoolOffers />

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

        {/* Technology Logos Strip */}
        <div className="mt-8 rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <p className="text-center text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">
            Technologies maitrisees par Manuel HARPON
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {techLogos.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
                title={tech.name}
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-all group-hover:shadow-md group-hover:border-primary/30">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
