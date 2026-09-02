"use client"

import { useState } from "react"
import { 
  Globe, 
  Code2, 
  Smartphone, 
  ShoppingCart, 
  BookOpen, 
  Wrench,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calculator,
  Zap,
  Users,
  Utensils,
  Star,
  Tag,
  TrendingUp,
  Briefcase,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  price: number
  features: string[]
  unit?: string
  popular?: boolean
  addon?: boolean
  promo?: boolean
  originalPrice?: number
  highlight?: boolean
}

interface ServiceCategory {
  id: string
  name: string
  icon: LucideIcon
  color: string
  isPromo?: boolean
  services: Service[]
}

// Promos category - FIRST and DEFAULT with special styling
const promoCategory: ServiceCategory = {
  id: "promos",
  name: "Offres Promotionnelles",
  icon: Sparkles,
  color: "promo",
  isPromo: true,
  services: [
    {
      id: "promo-association",
      icon: Users,
      title: "Coup de Pouce Associatif",
      description: "Site 1 page + sous-domaine offert",
      price: 19,
      unit: "/an",
      promo: true,
      originalPrice: 99,
      features: ["Sous-domaine personnalise", "Design professionnel", "Support inclus"],
    },
    {
      id: "promo-cv",
      icon: Briefcase,
      title: "CV Pro Augmente",
      description: "Site CV moderne avec portfolio",
      price: 19,
      unit: "/an",
      promo: true,
      originalPrice: 49,
      features: ["Design professionnel", "Portfolio integre", "Liens LinkedIn"],
    },
    {
      id: "promo-fiche",
      icon: TrendingUp,
      title: "Fiche Produit Boostee",
      description: "Page dediee SEO pour produit phare",
      price: 29,
      promo: true,
      originalPrice: 79,
      features: ["Page optimisee", "SEO avance", "Call-to-action"],
    },
    {
      id: "promo-vitrine-marche",
      icon: Tag,
      title: "Vitrine Marche de FDF",
      description: "Site 1 page + QR Code pour stand",
      price: 49,
      unit: "/an",
      promo: true,
      originalPrice: 99,
      features: ["QR Code pour stand", "Presentation produits", "Coordonnees"],
    },
    {
      id: "promo-restaurant",
      icon: Utensils,
      title: "Menu Restaurant Digital",
      description: "Site 1 page + menu interactif + QR Code",
      price: 79,
      unit: "/an",
      promo: true,
      originalPrice: 149,
      features: ["Menu interactif", "QR Code inclus", "Mise a jour facile"],
    },
    {
      id: "promo-social",
      icon: Zap,
      title: "Transformation Social > Site",
      description: "Votre Instagram/Facebook en site 3 pages",
      price: 99,
      promo: true,
      originalPrice: 199,
      features: ["Import automatique", "Design personnalise", "Liens reseaux"],
    },
    {
      id: "promo-vitrine",
      icon: Globe,
      title: "Site Vitrine 3 pages",
      description: "Accueil, Services, Contact + Formulaire",
      price: 99,
      promo: true,
      originalPrice: 400,
      features: ["Design responsive", "Formulaire contact", "SEO de base"],
    },
    {
      id: "promo-influenceur",
      icon: Star,
      title: "Pack Influenceur Local",
      description: "Site complet + Blog + Galerie",
      price: 149,
      promo: true,
      originalPrice: 299,
      features: ["Portfolio complet", "Blog integre", "Liens affilies"],
    },
    {
      id: "promo-serenite",
      icon: Globe,
      title: "Pack Serenite 1 An",
      description: "Site 3 pages + Audit SEO + Maintenance",
      price: 199,
      promo: true,
      originalPrice: 400,
      features: ["Site vitrine 3 pages", "Audit SEO complet", "Maintenance 1 an"],
    },
  ],
}

// Complete pricing data from the tariff grid
const serviceCategories: ServiceCategory[] = [
  promoCategory,
  {
    id: "web",
    name: "Web & Developpement",
    icon: Globe,
    color: "primary",
    services: [
      {
        id: "vitrine",
        icon: Globe,
        title: "Site Web Vitrine",
        description: "Site responsive 1-5 pages",
        price: 400,
        popular: false,
        features: ["Design responsive", "Formulaire de contact", "SEO de base"],
      },
      {
        id: "ecommerce",
        icon: ShoppingCart,
        title: "Site E-commerce",
        description: "Boutique en ligne avec paiement",
        price: 1000,
        popular: true,
        features: ["10 produits inclus", "Paiement securise", "Tableau vendeur"],
      },
      {
        id: "webapp",
        icon: Code2,
        title: "Application Web",
        description: "Backend avec espace client",
        price: 1500,
        popular: false,
        features: ["Espace client securise", "API REST", "Base de donnees"],
      },
      {
        id: "mobile",
        icon: Smartphone,
        title: "Application Mobile",
        description: "iOS & Android cross-platform",
        price: 1200,
        popular: false,
        features: ["React Native", "Notifications push", "2-3 ecrans"],
      },
      {
        id: "blog-premium",
        icon: Sparkles,
        title: "Module Blog Premium",
        description: "Systeme d'abonnement",
        price: 200,
        popular: false,
        addon: true,
        features: ["Paywall Stripe", "Niveaux d'acces", "Gratuit/Premium"],
      },
    ],
  },
  {
    id: "formation",
    name: "Formations",
    icon: BookOpen,
    color: "accent",
    services: [
      {
        id: "formation-info",
        icon: BookOpen,
        title: "Formation Informatique",
        description: "Cours a domicile",
        price: 20,
        unit: "/heure",
        features: ["Initiation", "Bureautique", "Code"],
      },
      {
        id: "formation-maths",
        icon: BookOpen,
        title: "Formation Mathematiques",
        description: "6e a 2nd, adultes",
        price: 20,
        unit: "/heure",
        features: ["Cours individuels", "Suivi personnalise"],
      },
      {
        id: "formation-entreprise",
        icon: BookOpen,
        title: "Formation Entreprise",
        description: "Jusqu'a 5 personnes",
        price: 100,
        unit: "/session",
        features: ["2h minimum", "Sur site client"],
      },
    ],
  },
  {
    id: "reparation",
    name: "Reparations PC",
    icon: Wrench,
    color: "secondary",
    services: [
      {
        id: "diagnostic",
        icon: Wrench,
        title: "Diagnostic Materiel",
        description: "Rapport de panne complet",
        price: 20,
        highlight: true,
        features: ["Offert si reparation"],
      },
      {
        id: "nettoyage",
        icon: Wrench,
        title: "Nettoyage/Optimisation",
        description: "Physique + logiciel",
        price: 30,
        features: ["Nettoyage complet"],
      },
      {
        id: "depannage",
        icon: Wrench,
        title: "Depannage Logiciel",
        description: "Virus, drivers, reseau",
        price: 30,
        features: ["Configuration complete"],
      },
      {
        id: "installation",
        icon: Wrench,
        title: "Installation Windows",
        description: "OS, drivers, logiciels",
        price: 50,
        features: ["Formatage inclus"],
      },
      {
        id: "recuperation",
        icon: Wrench,
        title: "Recuperation Donnees",
        description: "Sur disque fonctionnel",
        price: 50,
        features: ["Suppression accidentelle"],
      },
      {
        id: "composant",
        icon: Wrench,
        title: "Remplacement Composant",
        description: "RAM, SSD (piece non fournie)",
        price: 30,
        features: ["Main d'oeuvre"],
      },
      {
        id: "ecran",
        icon: Wrench,
        title: "Remplacement Ecran",
        description: "PC portable (piece non fournie)",
        price: 50,
        features: ["Intervention complete"],
      },
    ],
  },
]

export interface SelectedService {
  name: string
  price: string
}

interface ServiceSelectorProps {
  selectedServices?: SelectedService[]
  onServicesChange?: (services: SelectedService[]) => void
  onTotalChange?: (total: string) => void
  className?: string
}

export function ServiceSelector({ 
  selectedServices = [], 
  onServicesChange, 
  onTotalChange,
  className 
}: ServiceSelectorProps) {
  // Promos category is expanded by default
  const [expandedCategory, setExpandedCategory] = useState<string | null>("promos")
  
  // Get selected service names for internal use
  const selectedNames = selectedServices.map(s => s.name)

  const toggleService = (service: typeof serviceCategories[0]['services'][0]) => {
    const isCurrentlySelected = selectedNames.includes(service.title)
    
    let newServices: SelectedService[]
    if (isCurrentlySelected) {
      newServices = selectedServices.filter(s => s.name !== service.title)
    } else {
      newServices = [...selectedServices, {
        name: service.title,
        price: `${service.price}€${service.unit || ""}`
      }]
    }
    
    onServicesChange?.(newServices)
    
    // Calculate and report new total
    const newTotal = newServices.reduce((sum, s) => {
      const priceNum = parseInt(s.price.replace(/[^0-9]/g, '')) || 0
      return sum + priceNum
    }, 0)
    onTotalChange?.(`${newTotal}€`)
  }

  const isSelected = (serviceTitle: string) => selectedNames.includes(serviceTitle)

  const calculateTotal = () => {
    return selectedServices.reduce((sum, s) => {
      const priceNum = parseInt(s.price.replace(/[^0-9]/g, '')) || 0
      return sum + priceNum
    }, 0)
  }

  const total = calculateTotal()

  return (
    <div className={cn("space-y-3", className)}>
      {/* Categories */}
      {serviceCategories.map((category) => {
        const isPromoCategory = category.id === "promos"
        return (
        <div 
          key={category.id}
          className={cn(
            "rounded-xl border overflow-hidden transition-all",
            isPromoCategory 
              ? "border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20 shadow-lg shadow-amber-200/30 dark:shadow-amber-900/20" 
              : "border-border/50 bg-card"
          )}
        >
          {/* Category Header */}
          <button
            type="button"
            onClick={() => setExpandedCategory(
              expandedCategory === category.id ? null : category.id
            )}
            className={cn(
              "w-full flex items-center justify-between p-3 text-left transition-colors",
              isPromoCategory 
                ? expandedCategory === category.id 
                  ? "bg-gradient-to-r from-amber-100/80 to-orange-100/80 dark:from-amber-900/40 dark:to-orange-900/40 border-b border-amber-300/50" 
                  : "hover:bg-amber-100/50 dark:hover:bg-amber-900/30"
                : expandedCategory === category.id 
                  ? "bg-primary/5 border-b border-border/50" 
                  : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                isPromoCategory
                  ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"
                  : expandedCategory === category.id ? "bg-primary/20" : "bg-muted"
              )}>
                <category.icon className={cn(
                  "h-4 w-4",
                  isPromoCategory
                    ? "text-white"
                    : expandedCategory === category.id ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={cn(
                    "font-medium text-sm",
                    isPromoCategory ? "text-amber-800 dark:text-amber-300 font-bold" : "text-foreground"
                  )}>
                    {category.name}
                  </h4>
                  {isPromoCategory && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px] px-1.5 py-0 animate-pulse">
                      -50%
                    </Badge>
                  )}
                </div>
                <p className={cn(
                  "text-xs",
                  isPromoCategory ? "text-amber-700/80 dark:text-amber-400/80" : "text-muted-foreground"
                )}>
                  {category.services.length} {isPromoCategory ? "offres exclusives" : "services disponibles"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedNames.some(v => category.services.some(s => s.title === v)) && (
                <Badge variant="default" className={cn(
                  "text-xs",
                  isPromoCategory && "bg-gradient-to-r from-amber-500 to-orange-500 border-0"
                )}>
                  {selectedNames.filter(v => category.services.some(s => s.title === v)).length} selectionne(s)
                </Badge>
              )}
              {expandedCategory === category.id ? (
                <ChevronUp className={cn("h-4 w-4", isPromoCategory ? "text-amber-600" : "text-muted-foreground")} />
              ) : (
                <ChevronDown className={cn("h-4 w-4", isPromoCategory ? "text-amber-600" : "text-muted-foreground")} />
              )}
            </div>
          </button>

          {/* Services Grid */}
          {expandedCategory === category.id && (
            <div className={cn(
              "p-3 grid gap-2 sm:grid-cols-2",
              isPromoCategory && "bg-gradient-to-b from-transparent to-amber-50/50 dark:to-amber-950/20"
            )}>
              {category.services.map((service) => {
                const selected = isSelected(service.title)
                const isPromoService = 'promo' in service && service.promo
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={cn(
                      "relative flex flex-col p-3 rounded-lg border-2 text-left transition-all",
                      selected 
                        ? isPromoService
                          ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/40 shadow-md shadow-amber-200/50"
                          : "border-primary bg-primary/5 shadow-sm" 
                        : isPromoService
                          ? "border-amber-200/50 dark:border-amber-700/30 bg-white/80 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-400/50"
                          : "border-transparent bg-muted/30 hover:bg-muted/50 hover:border-border"
                    )}
                  >
                    {/* Selection indicator */}
                    <div className={cn(
                      "absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                      selected 
                        ? isPromoService 
                          ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" 
                          : "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}>
                      {selected && <Check className="h-3 w-3" />}
                    </div>

                    {/* Service content */}
                    <div className="flex items-start gap-2 pr-6">
                      <service.icon className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        selected 
                          ? isPromoService ? "text-amber-600" : "text-primary" 
                          : isPromoService ? "text-amber-500" : "text-muted-foreground"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className={cn(
                            "font-medium text-sm truncate",
                            isPromoService ? "text-amber-900 dark:text-amber-200" : "text-foreground"
                          )}>
                            {service.title}
                          </h5>
                          {service.popular && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0">
                              Populaire
                            </Badge>
                          )}
                          {service.addon && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              Module
                            </Badge>
                          )}
                          {isPromoService && (
                            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 text-[10px] px-1.5 py-0">
                              Promo
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span 
                            key={idx}
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded",
                              isPromoService ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" : "bg-background text-muted-foreground"
                            )}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {'originalPrice' in service && service.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {service.originalPrice}€
                          </span>
                        )}
                        <span className={cn(
                          "text-sm font-bold whitespace-nowrap",
                          selected 
                            ? isPromoService ? "text-amber-600" : "text-primary" 
                            : isPromoService ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                        )}>
                          {service.addon ? "+" : ""}{service.price}€{service.unit || ""}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )})}

      {/* Total Estimator */}
      {selectedServices.length > 0 && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Estimation ({selectedServices.length} service{selectedServices.length > 1 ? "s" : ""})
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">A partir de </span>
              <span className="text-lg font-bold text-primary">{total}€</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedServices.map((s, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {s.name} - {s.price}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Prix indicatif - Le devis final sera adapte a vos besoins specifiques
          </p>
        </div>
      )}
    </div>
  )
}
