"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, ArrowRight, Sparkles, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Real projects data with actual links
const projects = [
  {
    id: "1",
    title: "PLISTECH",
    description: "Site vitrine professionnel pour une entreprise de services technologiques et solutions informatiques.",
    category: "Site Vitrine",
    url: "https://plistech.com",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    client_name: "PLISTECH",
    featured: true,
  },
  {
    id: "2",
    title: "Full Belly",
    description: "Plateforme de restauration complete avec commande en ligne, gestion des menus et paiement securise.",
    category: "E-commerce",
    url: "https://fullbelly.fr",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
    client_name: "Full Belly Restaurant",
    featured: true,
  },
  {
    id: "3",
    title: "Lakou Sankofa",
    description: "Site communautaire et culturel avec gestion d'evenements, contenus educatifs et espace membres.",
    category: "Application Web",
    url: "https://lakousankofa.com",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    client_name: "Association Lakou Sankofa",
    featured: true,
  },
  {
    id: "4",
    title: "Afrocentricite",
    description: "Plateforme educative et culturelle dediee a l'histoire, la culture et les savoirs africains.",
    category: "Application Web",
    url: "https://afrocentricite.com",
    technologies: ["Next.js", "CMS", "Tailwind CSS"],
    client_name: "Afrocentricite",
    featured: true,
  },
  {
    id: "5",
    title: "TEKNOPY Concept",
    description: "Site vitrine et espace client pour agence de developpement web en Martinique.",
    category: "Site Vitrine",
    url: "https://teknopy.com",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    client_name: "TEKNOPY Concept",
    featured: true,
  },
  {
    id: "6",
    title: "Golden Star 1919",
    description: "Site officiel pour club sportif avec gestion des actualites, calendrier et espace adherents.",
    category: "Association",
    url: "https://goldenstar1919.org",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    client_name: "Golden Star 1919",
    featured: false,
  },
  {
    id: "7",
    title: "Kante Kant",
    description: "Site e-commerce de vente de produits locaux et artisanaux avec livraison en France metropolitaine.",
    category: "E-commerce",
    url: "https://kantekant.fr",
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
    client_name: "Kante Kant",
    featured: false,
  },
  {
    id: "8",
    title: "Open IT 972",
    description: "Site associatif pour la promotion du numerique et de l'informatique en Martinique.",
    category: "Association",
    url: "https://openit972.org",
    technologies: ["Next.js", "Tailwind CSS", "CMS"],
    client_name: "Association Open IT 972",
    featured: false,
  },
]

const categories = ["Tous", "Site Vitrine", "E-commerce", "Application Web", "Association"]

const stats = [
  { value: "50+", label: "Projets realises" },
  { value: "30+", label: "Clients satisfaits" },
  { value: "5+", label: "Annees d'experience" },
  { value: "100%", label: "Projets livres" },
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
              Nos <span className="text-primary">Realisations</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
              Decouvrez une selection de projets realises pour nos clients. 
              Sites vitrines, e-commerce, applications web et sites associatifs.
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

          {/* Projects grid with live previews */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
                {/* Live preview iframe */}
                <div className="relative h-44 overflow-hidden bg-muted">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <iframe
                    src={project.url}
                    title={`Apercu de ${project.title}`}
                    className="h-[440px] w-[200%] origin-top-left scale-50 border-0 pointer-events-none"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {project.featured && (
                    <Badge className="absolute left-2 top-2 z-20 bg-primary text-xs">
                      En vedette
                    </Badge>
                  )}
                  <div className="absolute bottom-2 right-2 z-20 opacity-0 transition-opacity group-hover:opacity-100">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <CardContent className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">{project.title}</h3>
                  <p className="mb-3 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="text-xs text-muted-foreground">{project.client_name}</span>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Globe className="h-3 w-3" />
                      Visiter
                    </a>
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
              Vous avez un projet en tete ?
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
