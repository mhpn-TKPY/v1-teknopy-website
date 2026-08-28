"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, CalendarDays, ChevronDown, Code2, GraduationCap, Sparkles } from "lucide-react"

const offers = [
  {
    category: "Première générale",
    title: "Parcours CNED accompagné",
    price: "à partir de 39 € / séance",
    details: "Français, enseignement scientifique, histoire-géographie, langues et méthodologie. Accompagnement complémentaire : le CNED reste la référence du programme suivi.",
    period: "Rentrée · Toussaint · préparation bac",
    icon: GraduationCap,
  },
  {
    category: "Brevet & lycée",
    title: "Stages vacances Martinique",
    price: "à partir de 149 € / stage",
    details: "Révisions ciblées, devoirs surveillés, méthode et remise à niveau pendant les vacances de Toussaint, Noël, Carnaval, Pâques et grandes vacances.",
    period: "Vacances scolaires Martinique",
    icon: CalendarDays,
  },
  {
    category: "Code & numérique",
    title: "Ateliers code pour jeunes",
    price: "à partir de 25 € / atelier",
    details: "Python, HTML/CSS, JavaScript et création de mini-projets, en individuel ou petit groupe, du collège à la Première.",
    period: "Mercredis · samedis · vacances",
    icon: Code2,
  },
  {
    category: "Méthode",
    title: "Pack examens & orientation",
    price: "à partir de 249 € / parcours",
    details: "Planning personnalisé, fiches de synthèse, entraînement oral et aide à l'organisation pour les échéances de Première et les choix d'orientation.",
    period: "Janvier · Carnaval · printemps",
    icon: BookOpen,
  },
]

export function SchoolOffers() {
  const [open, setOpen] = useState<string | null>(offers[0].title)

  return (
    <section id="offres-scolaires" className="mt-8 rounded-3xl border border-primary/20 bg-card/95 p-5 text-left shadow-xl backdrop-blur-sm md:p-7">
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" />
            Offres cours & code
          </div>
          <h2 className="text-balance text-xl font-bold text-foreground md:text-2xl">Un accompagnement scolaire pensé pour la Martinique</h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">Des formats flexibles pour avancer pendant l&apos;année, les vacances et les périodes d&apos;examen.</p>
        </div>
        <Link href="/contact" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Demander un conseil</Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {offers.map((offer) => {
          const Icon = offer.icon
          const isOpen = open === offer.title
          return (
            <article key={offer.title} className="rounded-2xl border border-border bg-background/70 p-4 transition-colors hover:border-primary/40">
              <button type="button" onClick={() => setOpen(isOpen ? null : offer.title)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-3 text-left">
                <span className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                  <span><span className="block text-xs font-semibold uppercase tracking-wide text-primary">{offer.category}</span><span className="mt-1 block font-semibold text-foreground">{offer.title}</span></span>
                </span>
                <ChevronDown className={`mt-1 size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-accent/10 px-2.5 py-1 font-semibold text-accent-foreground">{offer.price}</span><span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{offer.period}</span></div>
              {isOpen && <p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted-foreground">{offer.details}</p>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
