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
  { label: "CV Pro Augmente", price: "19EUR/an", icon: Zap },
  { label: "Vitrine Marche FDF", price: "49EUR/an", icon: Tag },
  { label: "Sous-domaine", price: "6 mois offerts", icon: Clock },
]

export function PromosSection() {
  return (
    <section 
      className="py-12 lg:py-16 relative overflow-hidden"
      aria-labelledby="promos-title"
      role="region"
    >
      {/* Accessible warm gradient background - high contrast maintained */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      {/* Subtle decorative elements - purely visual */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/5" aria-hidden="true" />
      
      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section header - centered */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-amber-900/50 dark:to-emerald-900/50 mb-4 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Offres Exclusives Martinique</span>
          </div>
          <h2 id="promos-title" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
              Promos & Nouveautes
            </span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Des tarifs imbattables pour lancer votre presence en ligne. Paiement en 4x sans frais des 99EUR.
          </p>
        </div>

        {/* Mini prices bar - LARGER CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {miniPrices.map((item, index) => (
            <Link
              key={index}
              href="/promos"
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white dark:bg-slate-800 shadow-lg border-2 border-amber-300/60 dark:border-amber-600/40 hover:border-primary hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span className="text-base font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="text-base font-bold text-primary">{item.price}</span>
            </Link>
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
