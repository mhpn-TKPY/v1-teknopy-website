"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ArrowRight, Globe, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Real projects data - ordered: fullbelly, lakousankofa, goldenstar1919, kantekant first
const featuredProjects = [
  {
    id: "1",
    title: "Full Belly",
    description: "Plateforme de restauration avec commande en ligne et gestion des menus.",
    category: "E-commerce",
    url: "https://fullbelly.fr",
    technologies: ["React", "Node.js", "Stripe"],
    thumbnail: "/images/projects/fullbelly.jpg",
  },
  {
    id: "2",
    title: "Lakou Sankofa",
    description: "Site communautaire et culturel avec gestion d'evenements et contenus.",
    category: "Application Web",
    url: "https://lakousankofa.com",
    technologies: ["Next.js", "Supabase"],
    thumbnail: "/images/projects/lakousankofa.jpg",
  },
  {
    id: "3",
    title: "Golden Star 1919",
    description: "Site officiel pour club sportif avec actualites et espace adherents.",
    category: "Association",
    url: "https://goldenstar1919.org",
    technologies: ["Next.js", "Supabase"],
    thumbnail: "/images/projects/goldenstar.jpg",
  },
  {
    id: "4",
    title: "Kante Kant",
    description: "Site e-commerce de vente de produits locaux et artisanaux.",
    category: "E-commerce",
    url: "https://kantekant.fr",
    technologies: ["Next.js", "Stripe"],
    thumbnail: "/images/projects/kantekant.jpg",
  },
]

function ProjectCard({ project }: { project: typeof featuredProjects[0] }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <Card 
      className="group overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Live preview iframe with loading state */}
      <div className="relative h-40 overflow-hidden bg-muted">
        {/* Loading skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">Chargement...</span>
            </div>
          </div>
        )}
        
        {/* Fallback image if iframe fails */}
        {hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-center">
              <Globe className="mx-auto h-8 w-8 text-primary/50" />
              <span className="mt-2 block text-xs text-muted-foreground">{project.title}</span>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        {/* Iframe with extended loading time */}
        <iframe
          src={project.url}
          title={`Apercu de ${project.title}`}
          className={`h-[400px] w-[200%] origin-top-left scale-50 border-0 pointer-events-none transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          loading="eager"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => {
            // Delay to ensure content is fully rendered
            setTimeout(() => setIsLoading(false), 2000)
          }}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
        />
        
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
