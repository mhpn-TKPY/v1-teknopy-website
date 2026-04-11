"use client"

import Link from "next/link"
import { Utensils, Users, Star, Globe, Zap, ArrowRight, Sparkles, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const promoOffers = [
  {
    id: "site-vitrine",
    icon: Globe,
    title: "Site Vitrine 3 pages",
    description: "Accueil, Services, Contact + Formulaire",
    price: 99,
    originalPrice: 400,
    unit: "",
    badge: "Best-seller",
    features: ["Responsive mobile", "Formulaire contact", "SEO de base"],
    color: "from-primary to-emerald-600",
    bgGlow: "bg-primary/20",
  },
  {
    id: "restaurant",
    icon: Utensils,
    title: "Menu Restaurant Digital",
    description: "1 page menu + QR Code pour tables",
    price: 79,
    originalPrice: 149,
    unit: "/an",
    badge: "Nouveau",
    features: ["Menu interactif", "QR Code inclus", "Mise a jour facile"],
    color: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
  },
  {
    id: "association",
    icon: Users,
    title: "Coup de Pouce Associatif",
    description: "Site 1 page sur sous-domaine",
    price: 19,
    originalPrice: 99,
    unit: "/an",
    badge: "Solidaire",
    features: ["Sous-domaine offert", "Design pro", "Support inclus"],
    color: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-500/20",
  },
  {
    id: "influenceur",
    icon: Star,
    title: "Pack Influenceur Local",
    description: "Site + Blog + Galerie + Liens affilies",
    price: 149,
    originalPrice: 299,
    unit: "",
    badge: "Populaire",
    features: ["Portfolio complet", "Blog integre", "Liens sociaux"],
    color: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20",
  },
]

const miniPrices = [
  { label: "CV Pro Augmente", price: "19EUR", icon: Zap },
  { label: "Vitrine Marche FDF", price: "49EUR/an", icon: Tag },
  { label: "Sous-domaine", price: "6 mois offerts", icon: Clock },
]

export function PromosSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Warm gradient background - colors matching logo (green/gold accents) */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/50 dark:from-amber-950/20 dark:via-slate-900 dark:to-emerald-950/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      
      <div className="container relative px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-amber-900/30 dark:to-emerald-900/30 mb-4">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Offres Exclusives Martinique</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
              Promos & Nouveautes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des tarifs imbattables pour lancer votre presence en ligne. Paiement en 4x sans frais des 99EUR.
          </p>
        </div>

        {/* Mini prices bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {miniPrices.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-amber-200/50 dark:border-amber-700/30"
            >
              <item.icon className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              <span className="text-sm font-bold text-primary">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Promo cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {promoOffers.map((offer) => (
            <Card
              key={offer.id}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow effect */}
              <div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity", offer.bgGlow)} />
              
              {/* Badge */}
              <div className="absolute top-3 right-3">
                <Badge className={cn("bg-gradient-to-r text-white border-0 shadow-md", offer.color)}>
                  {offer.badge}
                </Badge>
              </div>

              <CardContent className="p-6 relative">
                {/* Icon */}
                <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", offer.color)}>
                  <offer.icon className="h-6 w-6 text-white" />
                </div>

                {/* Title & description */}
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {offer.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={cn("text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent", offer.color)}>
                    {offer.price}EUR
                  </span>
                  <span className="text-sm text-muted-foreground">{offer.unit}</span>
                  <span className="text-sm text-slate-400 line-through ml-1">
                    {offer.originalPrice}EUR
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-r", offer.color)} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                  <Link href={`/promos#${offer.id}`}>
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to promos page */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary via-amber-600 to-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all gap-2">
            <Link href="/promos">
              <Tag className="h-5 w-5" />
              Voir toutes les offres
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Paiement en 4x sans frais | Domaine .fr/.com offert 1 an | Deplacement offert Fort-de-France
          </p>
        </div>
      </div>
    </section>
  )
}
