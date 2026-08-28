"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Crown, GraduationCap, Sparkles, Timer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Offer = {
  title: string
  description: string
  price: string
  unit: string
  features: string[]
  badge?: string
  highlight?: boolean
}

const categories = [
  { id: "all", label: "Toutes les offres", icon: Sparkles },
  { id: "code", label: "Code de la route", icon: Timer },
  { id: "college", label: "Collège", icon: GraduationCap },
  { id: "lycee", label: "Lycée", icon: GraduationCap },
  { id: "premium", label: "Premium", icon: Crown },
] as const

const offerGroups: Record<string, { title: string; description: string; offers: Offer[] }> = {
  code: {
    title: "Code de la route",
    description: "Progressez avec un accompagnement adapté à votre rythme.",
    offers: [
      { title: "Cours individuel", description: "Séance personnalisée de 2h", price: "15€", unit: "/ personne", badge: "Populaire", highlight: true, features: ["Tests blancs inclus", "Correction détaillée", "Accès à la plateforme en ligne"] },
      { title: "Cours en groupe", description: "Petit comité de 2 à 4 personnes", price: "5€", unit: "/ personne", badge: "Économique", features: ["Séance de 2h", "Tests blancs collectifs", "Correction en groupe"] },
    ],
  },
  college: {
    title: "Collège",
    description: "Un soutien scolaire clair et régulier dans toutes les matières.",
    offers: [
      { title: "Cours particulier", description: "Soutien personnalisé par matière", price: "10€", unit: "/ heure", badge: "Recommandé", highlight: true, features: ["Cours sur mesure", "Suivi de progression", "Devoirs surveillés"] },
      { title: "Abonnement collège", description: "Des ressources disponibles chaque jour", price: "30€", unit: "/ mois", features: ["Supports téléchargeables", "Cours en ligne", "Exercices corrigés"] },
    ],
  },
  lycee: {
    title: "Lycée",
    description: "Préparez le Bac avec des ressources et une méthode solides.",
    offers: [
      { title: "Cours particulier", description: "Préparation personnalisée", price: "15€", unit: "/ heure", badge: "Bac", highlight: true, features: ["Méthodologie approfondie", "Annales corrigées", "Cours sur mesure"] },
      { title: "Pack matières", description: "Téléchargement illimité par matière", price: "50€", unit: "/ mois", features: ["Cours complets", "Exercices et corrections", "Sujets type Bac"] },
      { title: "Classe complète", description: "Toutes les matières du programme", price: "200€", unit: "/ mois", badge: "Best-seller", highlight: true, features: ["Toutes les matières", "Cours en direct", "Préparation intensive Bac"] },
    ],
  },
  premium: {
    title: "Premium",
    description: "L'excellence académique avec un suivi qui ne laisse rien au hasard.",
    offers: [
      { title: "Forfait All Exclusive", description: "Toutes les ressources, tous les accompagnements", price: "400€", unit: "/ mois", badge: "Ultime", highlight: true, features: ["Collège et lycée inclus", "Cours particuliers illimités", "Suivi pédagogique personnalisé", "Préparation aux examens"] },
    ],
  },
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className={cn("flex h-full flex-col transition-transform hover:-translate-y-1 hover:shadow-lg", offer.highlight && "border-primary/50 shadow-md")}>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{offer.title}</CardTitle>
            <CardDescription className="mt-1">{offer.description}</CardDescription>
          </div>
          {offer.badge && <Badge variant="secondary">{offer.badge}</Badge>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">{offer.price}</span>
          <span className="text-sm text-muted-foreground">{offer.unit}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <ul className="flex flex-1 flex-col gap-3">
          {offer.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full">
          <Link href="/contact">Choisir cette offre <ArrowRight data-icon="inline-end" /></Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export function AllOffers() {
  const [activeTab, setActiveTab] = useState("all")
  const visibleGroups = activeTab === "all" ? Object.entries(offerGroups) : [[activeTab, offerGroups[activeTab]]]

  return (
    <section id="offres" className="bg-secondary/20 py-16 md:py-24">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge variant="secondary"><Sparkles data-icon="inline-start" /> Nos offres</Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">Des tarifs adaptés à chaque niveau</h2>
          <p className="text-pretty text-lg text-muted-foreground">Choisissez une formule simple, transparente et pensée pour vos objectifs.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["500+ élèves accompagnés", "98% de réussite", "15+ professeurs", "4.9/5 de satisfaction"].map((stat) => (
            <div key={stat} className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4 text-center"><strong className="text-xl text-primary">{stat.split(" ")[0]}</strong><span className="text-sm text-muted-foreground">{stat.slice(stat.indexOf(" ") + 1)}</span></div>
          ))}
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mx-auto grid h-auto w-full max-w-4xl grid-cols-3 gap-1 p-1 sm:grid-cols-5">
            {categories.map(({ id, label, icon: Icon }) => <TabsTrigger key={id} value={id} className="gap-2"><Icon data-icon="inline-start" /><span className="hidden sm:inline">{label}</span><span className="sm:hidden">{id === "all" ? "Tout" : label.split(" ")[0]}</span></TabsTrigger>)}
          </TabsList>
          {categories.map(({ id }) => <TabsContent key={id} value={id} className="mt-8">{id === activeTab && <div className="flex flex-col gap-8">{visibleGroups.map(([key, group]) => group && <div key={key} className="flex flex-col gap-5"><div><h3 className="text-2xl font-semibold">{group.title}</h3><p className="text-muted-foreground">{group.description}</p></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{group.offers.map((offer) => <OfferCard key={offer.title} offer={offer} />)}</div></div>)}</div>}</TabsContent>)}
        </Tabs>
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-6 text-center sm:flex-row sm:text-left md:p-8">
          <div><h3 className="text-xl font-semibold">Besoin d'un devis personnalisé ?</h3><p className="text-muted-foreground">Nous vous répondons sous 24h avec une proposition adaptée.</p></div>
          <Button asChild size="lg"><Link href="/contact">Demander un devis <ArrowRight data-icon="inline-end" /></Link></Button>
        </div>
      </div>
    </section>
  )
}

export default AllOffers
