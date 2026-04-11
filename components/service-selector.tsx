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
  Calculator
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Complete pricing data from the tariff grid
const serviceCategories = [
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>("web")
  
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
      {serviceCategories.map((category) => (
        <div 
          key={category.id}
          className="rounded-xl border border-border/50 bg-card overflow-hidden transition-all"
        >
          {/* Category Header */}
          <button
            type="button"
            onClick={() => setExpandedCategory(
              expandedCategory === category.id ? null : category.id
            )}
            className={cn(
              "w-full flex items-center justify-between p-3 text-left transition-colors",
              expandedCategory === category.id 
                ? "bg-primary/5 border-b border-border/50" 
                : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                expandedCategory === category.id ? "bg-primary/20" : "bg-muted"
              )}>
                <category.icon className={cn(
                  "h-4 w-4",
                  expandedCategory === category.id ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">{category.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {category.services.length} services disponibles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedNames.some(v => category.services.some(s => s.title === v)) && (
                <Badge variant="default" className="text-xs">
                  {selectedNames.filter(v => category.services.some(s => s.title === v)).length} selectionne(s)
                </Badge>
              )}
              {expandedCategory === category.id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Services Grid */}
          {expandedCategory === category.id && (
            <div className="p-3 grid gap-2 sm:grid-cols-2">
              {category.services.map((service) => {
                const selected = isSelected(service.title)
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={cn(
                      "relative flex flex-col p-3 rounded-lg border-2 text-left transition-all",
                      selected 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-transparent bg-muted/30 hover:bg-muted/50 hover:border-border"
                    )}
                  >
                    {/* Selection indicator */}
                    <div className={cn(
                      "absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                      selected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {selected && <Check className="h-3 w-3" />}
                    </div>

                    {/* Service content */}
                    <div className="flex items-start gap-2 pr-6">
                      <service.icon className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        selected ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-medium text-sm text-foreground truncate">
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
                            className="text-[10px] px-1.5 py-0.5 bg-background rounded text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <span className={cn(
                        "text-sm font-bold whitespace-nowrap",
                        selected ? "text-primary" : "text-foreground"
                      )}>
                        {service.addon ? "+" : ""}{service.price}€{service.unit || ""}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ))}

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
