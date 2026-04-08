"use client"

import { useState } from "react"
import { ExternalLink, ArrowRight, Globe, ShoppingCart, Layout } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Fonction pour générer l'URL du screenshot avec fallback
function getScreenshotUrl(url: string): string {
  // Utiliser microlink avec des paramètres optimisés pour HTTP/HTTPS
  const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&timeout=30000`
}

// Composant Image avec gestion d'erreur et fallback
function ProjectScreenshot({ 
  project, 
  className 
}: { 
  project: typeof projects[0]
  className?: string 
}) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Gradient background (always visible as fallback) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 transition-opacity duration-300`} />
      
      {/* Loading skeleton */}
      {isLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      
      {/* Fallback content when image fails */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Globe className="mb-2 h-12 w-12 opacity-50" />
          <span className="text-lg font-semibold">{project.title}</span>
          <span className="text-sm opacity-75">{project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
        </div>
      )}
      
      {/* Actual screenshot image */}
      {!imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.screenshot}
          alt={`Capture d'écran de ${project.title}`}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true)
            setIsLoading(false)
          }}
        />
      )}
    </>
  )
}

// Vrais projets réalisés par TEKNOPY avec screenshots
const projects = [
  {
    id: "1",
    title: "Plistech",
    description: "Site vitrine professionnel pour services informatiques et solutions technologiques en Martinique. Design moderne et responsive.",
    category: "Site Vitrine",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://plistech.com",
    // Screenshot via microlink.io API (service gratuit de capture d'écran)
    screenshot: "https://api.microlink.io/?url=https://plistech.com&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-blue-500 to-purple-600",
    icon: Globe,
    featured: true,
  },
  {
    id: "2",
    title: "Full Belly",
    description: "Plateforme de restauration et traiteur avec système de commande en ligne et gestion des menus dynamique.",
    category: "E-commerce",
    technologies: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
    url: "https://fullbelly.fr",
    screenshot: "https://api.microlink.io/?url=https://fullbelly.fr&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-orange-500 to-red-600",
    icon: ShoppingCart,
    featured: true,
  },
  {
    id: "3",
    title: "Lakou Sankofa",
    description: "Plateforme culturelle dédiée à la préservation et la promotion du patrimoine africain et caribéen.",
    category: "Application Web",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    url: "https://lakousankofa.com",
    screenshot: "https://api.microlink.io/?url=https://lakousankofa.com&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-emerald-500 to-teal-600",
    icon: Layout,
    featured: true,
  },
  {
    id: "4",
    title: "Afrocentricité",
    description: "Portail d'information et de ressources sur l'histoire et la culture afro-centrée.",
    category: "Site Vitrine",
    technologies: ["WordPress", "PHP", "MySQL", "CSS"],
    url: "https://afrocentricite.com",
    screenshot: "https://api.microlink.io/?url=https://afrocentricite.com&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-amber-500 to-orange-600",
    icon: Globe,
    featured: true,
  },
  {
    id: "5",
    title: "Teknopy",
    description: "Site officiel de l'agence web TEKNOPY Création avec portfolio et formulaire de contact.",
    category: "Site Vitrine",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    url: "https://teknopy.com",
    screenshot: "https://api.microlink.io/?url=https://teknopy.com&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-green-500 to-emerald-600",
    icon: Globe,
    featured: true,
  },
  {
    id: "6",
    title: "Golden Star 1919",
    description: "Site officiel de l'association historique Golden Star avec actualités et événements sportifs.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    url: "https://goldenstar1919.org",
    screenshot: "https://api.microlink.io/?url=https://goldenstar1919.org&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-yellow-500 to-amber-600",
    icon: Globe,
    featured: true,
  },
  {
    id: "7",
    title: "Kanté Kant",
    description: "Plateforme e-commerce pour produits artisanaux et créations locales de Martinique.",
    category: "E-commerce",
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS"],
    url: "https://kantekant.fr",
    screenshot: "https://api.microlink.io/?url=https://kantekant.fr&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-pink-500 to-rose-600",
    icon: ShoppingCart,
    featured: true,
  },
  {
    id: "8",
    title: "OpenIT 972",
    description: "Association d'entraide informatique en Martinique - formation et assistance numérique.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    url: "http://www.openit972.org",
    screenshot: "https://api.microlink.io/?url=http://www.openit972.org&screenshot=true&meta=false&embed=screenshot.url",
    color: "from-cyan-500 to-blue-600",
    icon: Globe,
    featured: true,
  },
]

const categories = [
  { id: "Tous", label: "Tous les projets", count: projects.length },
  { id: "Site Vitrine", label: "Sites Vitrines", count: projects.filter(p => p.category === "Site Vitrine").length },
  { id: "E-commerce", label: "E-commerce", count: projects.filter(p => p.category === "E-commerce").length },
  { id: "Application Web", label: "Applications", count: projects.filter(p => p.category === "Application Web").length },
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section id="projets" className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-background via-secondary/20 to-background" aria-labelledby="projets-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-sm font-medium">
            Portfolio TEKNOPY
          </Badge>
          <h2 id="projets-heading" className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Nos Réalisations Web en Martinique
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Découvrez une sélection de projets réalisés par TEKNOPY Création pour nos clients en Martinique et ailleurs.
            Chaque projet est unique et conçu sur mesure selon vos besoins.
          </p>
        </header>

        {/* Category filter - Pills style */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 md:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300
                ${activeCategory === category.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-md"
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                {category.label}
                <span className={`
                  rounded-full px-2 py-0.5 text-xs
                  ${activeCategory === category.id 
                    ? "bg-primary-foreground/20" 
                    : "bg-muted"
                  }
                `}>
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Featured Projects - Larger cards */}
        {featuredProjects.length > 0 && (
          <div className="mb-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {featuredProjects.map((project) => {
                const IconComponent = project.icon
                return (
                  <Card 
                    key={project.id} 
                    className="group relative flex flex-col overflow-hidden border-0 bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Screenshot with gradient overlay */}
                    <div className="relative h-44 overflow-hidden md:h-48 lg:h-52">
                      {/* Screenshot image with loading and error handling */}
                      <ProjectScreenshot 
                        project={project} 
                        className="group-hover:scale-110" 
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Featured badge */}
                      <div className="absolute left-4 top-4">
                        <Badge className={`bg-gradient-to-r ${project.color} border-0 text-white shadow-lg`}>
                          <IconComponent className="mr-1 h-3 w-3" />
                          {project.category}
                        </Badge>
                      </div>
                      
                      {/* Project title on image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Hover overlay */}
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`
                          absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm
                          transition-opacity duration-300
                          ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}
                        `}
                      >
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className={`rounded-full bg-gradient-to-r ${project.color} p-4 shadow-xl`}>
                            <ExternalLink className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-lg font-semibold text-white">Visiter le site</span>
                          <span className="text-sm text-white/80">{project.url.replace("https://", "")}</span>
                        </div>
                      </a>
                    </div>
                    
                    <CardContent className="flex flex-1 flex-col p-4">
                      <p className="mb-3 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs font-normal">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`
                          group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg
                          bg-gradient-to-r ${project.color} px-4 py-2.5 text-sm font-medium text-white
                          shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110
                        `}
                      >
                        <Globe className="h-4 w-4" />
                        Voir le projet
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Regular Projects - Smaller cards */}
        {regularProjects.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regularProjects.map((project) => {
              const IconComponent = project.icon
              return (
                <Card 
                  key={project.id} 
                  className="group relative overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Screenshot thumbnail */}
                  <div className="relative h-36 overflow-hidden">
                    <ProjectScreenshot 
                      project={project} 
                      className="group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category badge */}
                    <Badge variant="secondary" className="absolute right-2 top-2 text-xs">
                      <IconComponent className="mr-1 h-3 w-3" />
                      {project.category}
                    </Badge>
                    
                    {/* Hover overlay */}
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`
                        absolute inset-0 flex items-center justify-center bg-black/60
                        transition-opacity duration-200
                        ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}
                      `}
                    >
                      <div className="rounded-full bg-white p-2 shadow-lg">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                    </a>
                  </div>
                  
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {project.url.replace("https://", "")}
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-10 text-center md:mt-12">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 md:p-8">
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Vous avez un projet en tête ?</h3>
            <p className="mb-4 text-sm text-muted-foreground md:mb-5 md:text-base">
              Discutons ensemble de votre idée et transformons-la en réalité.
            </p>
            <Button 
              size="lg" 
              className="group shadow-lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Démarrer un projet
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
