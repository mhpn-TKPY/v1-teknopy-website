"use client"

import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ArrowRight, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Real projects data - using logos for fast loading
const featuredProjects = [
  {
    id: "1",
    title: "Full Belly",
    description: "Plateforme de restauration avec commande en ligne et gestion des menus.",
    category: "E-commerce",
    url: "https://fullbelly.fr",
    technologies: ["React", "Node.js", "Stripe"],
    logo: "/images/projects/fullbelly-logo.jpeg",
  },
  {
    id: "2",
    title: "Lakou Sankofa",
    description: "Site communautaire et culturel avec gestion d'evenements et contenus.",
    category: "Application Web",
    url: "https://lakousankofa.com",
    technologies: ["Next.js", "Supabase"],
    logo: "/images/projects/lakousankofa-logo.webp",
  },
  {
    id: "3",
    title: "Golden Star 1919",
    description: "Site officiel pour club sportif avec actualites et espace adherents.",
    category: "Association",
    url: "https://goldenstar1919.org",
    technologies: ["Next.js", "Supabase"],
    logo: "/images/projects/goldenstar-logo.png",
  },
  {
    id: "4",
    title: "Kant & Kant",
    description: "Site e-commerce de vente de produits locaux et artisanaux.",
    category: "E-commerce",
    url: "https://kantekant.fr",
    technologies: ["Next.js", "Stripe"],
    logo: "/images/projects/kantekant-logo.png",
  },
]

function ProjectCard({ project }: { project: typeof featuredProjects[0] }) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Logo display - fast loading, no iframe */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Image
            src={project.logo}
            alt={`Logo ${project.title}`}
            width={160}
            height={120}
            className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
          <Badge className="bg-primary/90 text-xs">
            {project.category}
          </Badge>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      
      <CardContent className="p-3">
        <h3 className="mb-1 font-semibold text-foreground">{project.title}</h3>
        <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 2).map((tech) => (
            <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsPreview() {
  return (
    <section id="realisations" className="bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">
            <Globe className="mr-1 h-3 w-3" />
            Portfolio
          </Badge>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Nos Realisations
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Decouvrez une selection de projets realises pour nos clients.
          </p>
        </div>

        {/* Projects grid with live previews */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA to see all projects */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/projets">
              Voir toutes nos realisations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
