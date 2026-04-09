"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Folder, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: "1",
    title: "Plateforme E-commerce Artisanat Martiniquais",
    description: "Boutique en ligne complète pour artisans locaux avec paiement sécurisé et gestion des stocks.",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    client_name: "Artisans de Martinique",
    featured: true,
    details: "Plateforme multi-vendeurs permettant aux artisans locaux de vendre leurs créations en ligne avec gestion automatique des frais de port DOM-TOM.",
  },
  {
    id: "2",
    title: "Application de Réservation Restaurant",
    description: "Système de réservation en temps réel avec gestion des tables et notifications SMS.",
    category: "Application Web",
    technologies: ["React", "Node.js", "PostgreSQL", "Twilio"],
    client_name: "Restaurant Le Créole",
    featured: true,
    details: "Application complète de gestion des réservations avec interface admin, notifications clients et statistiques de fréquentation.",
  },
  {
    id: "3",
    title: "Site Vitrine Cabinet Médical",
    description: "Site responsive avec prise de rendez-vous en ligne et espace patient sécurisé.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Tailwind CSS", "Supabase Auth"],
    client_name: "Cabinet Dr. Laurent",
    featured: false,
    details: "Site professionnel avec système de prise de rendez-vous, espace patient sécurisé et informations pratiques.",
  },
  {
    id: "4",
    title: "Tableau de Bord Analytique",
    description: "Dashboard interactif pour suivi des KPIs avec visualisations temps réel.",
    category: "Application Web",
    technologies: ["React", "TypeScript", "Recharts", "Supabase"],
    client_name: "PME Caraïbes",
    featured: true,
    details: "Interface de pilotage avec graphiques interactifs, export de rapports et alertes automatiques sur indicateurs clés.",
  },
  {
    id: "5",
    title: "Site Association Sportive",
    description: "Plateforme communautaire avec gestion des membres, événements et résultats.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    client_name: "Club Nautique FDF",
    featured: false,
    details: "Espace membre complet avec calendrier d'événements, galerie photo et gestion des inscriptions en ligne.",
  },
  {
    id: "6",
    title: "Application Mobile Tourisme",
    description: "Guide touristique interactif avec géolocalisation et avis utilisateurs.",
    category: "Application Mobile",
    technologies: ["React Native", "TypeScript", "Supabase", "Maps API"],
    client_name: "Office du Tourisme",
    featured: true,
    details: "Application iOS et Android avec carte interactive, itinéraires personnalisés et système d'avis vérifiés.",
  },
]

const categories = ["Tous", "E-commerce", "Application Web", "Site Vitrine", "Application Mobile"]

const stats = [
  { value: "50+", label: "Projets réalisés" },
  { value: "30+", label: "Clients satisfaits" },
  { value: "5+", label: "Années d'expérience" },
  { value: "100%", label: "Projets livrés" },
]

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Portfolio
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Nos <span className="text-primary">Réalisations</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
              Découvrez une sélection de projets réalisés pour nos clients en Martinique. 
              Sites vitrines, e-commerce, applications web et mobiles.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                <span className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</span>
                <span className="block text-xs text-muted-foreground md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Category filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group flex flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                {/* Project thumbnail placeholder */}
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <Folder className="h-16 w-16 text-primary/30 transition-transform group-hover:scale-110" />
                  {project.featured && (
                    <Badge className="absolute right-3 top-3 bg-primary">
                      En vedette
                    </Badge>
                  )}
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.details}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Client: {project.client_name}</span>
                    <Button variant="ghost" size="sm" className="gap-1 px-2">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl text-balance">
              Vous avez un projet en tête ?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Discutons de votre projet et trouvons ensemble la meilleure solution pour atteindre vos objectifs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Demander un devis gratuit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tarifs">Voir nos tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
