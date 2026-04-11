"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Globe, Utensils, Users, Star, Zap, Tag, Clock, Check, 
  ArrowRight, Sparkles, CreditCard, Gift, Shield, Phone,
  RefreshCw, QrCode, Briefcase, TrendingUp, Heart, Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Categories for filtering
const categories = [
  { id: "all", label: "Toutes", icon: Filter },
  { id: "micro", label: "Micro-sites", icon: Zap },
  { id: "web", label: "Sites Web", icon: Globe },
  { id: "premium", label: "Premium", icon: Star },
]

// All offers from Marketing document
const allOffers = [
  {
    id: "site-vitrine",
    category: "web",
    icon: Globe,
    title: "Site Vitrine 3 pages",
    description: "Accueil, Services, Contact + Formulaire de contact integre",
    price: 99,
    originalPrice: 400,
    unit: "",
    badge: "Best-seller",
    badgeColor: "bg-primary",
    features: [
      "Design responsive mobile-first",
      "Formulaire de contact fonctionnel",
      "SEO de base optimise",
      "Sous-domaine offert votre-site.teknopy.com",
      "Hebergement offert 1 an",
    ],
    color: "from-primary to-emerald-600",
    bgGlow: "bg-primary/10",
    highlight: true,
  },
  {
    id: "restaurant",
    category: "micro",
    icon: Utensils,
    title: "Menu Restaurant Digital",
    description: "Site 1 page avec menu interactif + QR Code pour tables/comptoir",
    price: 79,
    originalPrice: 149,
    unit: "/an",
    badge: "Restaurateurs",
    badgeColor: "bg-amber-500",
    features: [
      "Menu interactif et moderne",
      "QR Code personnalise inclus",
      "Mise a jour facile des plats",
      "Photos des plats incluses",
      "Compatible tous smartphones",
    ],
    color: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
    highlight: true,
  },
  {
    id: "association",
    category: "micro",
    icon: Users,
    title: "Coup de Pouce Associatif",
    description: "Site 1 page sur sous-domaine votre-asso.teknopy.com",
    price: 19,
    originalPrice: 99,
    unit: "/an",
    badge: "Solidaire",
    badgeColor: "bg-emerald-500",
    features: [
      "Sous-domaine personnalise",
      "Design professionnel",
      "Formulaire d'adhesion",
      "Support technique inclus",
      "Mises a jour gratuites",
    ],
    color: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-500/10",
    highlight: true,
  },
  {
    id: "influenceur",
    category: "web",
    icon: Star,
    title: "Pack Influenceur Local",
    description: "Site complet + Blog + Galerie + Liens affilies integres",
    price: 149,
    originalPrice: 299,
    unit: "",
    badge: "Createurs",
    badgeColor: "bg-violet-500",
    features: [
      "Portfolio photos/videos",
      "Blog integre",
      "Liens affilies et partenaires",
      "Integration reseaux sociaux",
      "Analytics visiteurs",
    ],
    color: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/10",
    highlight: true,
  },
  {
    id: "pack-serenite",
    category: "web",
    icon: Shield,
    title: "Pack Serenite 1 An",
    description: "Site 3 pages + Audit SEO + Maintenance complete 1 an",
    price: 199,
    originalPrice: 499,
    unit: "",
    badge: "Tout inclus",
    badgeColor: "bg-blue-500",
    features: [
      "Site vitrine 3 pages",
      "Audit SEO complet",
      "Maintenance 1 an incluse",
      "Sauvegardes automatiques",
      "Support prioritaire",
    ],
    color: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
    highlight: false,
  },
  {
    id: "transfo-social",
    category: "web",
    icon: RefreshCw,
    title: "Transformation Social > Site",
    description: "Votre Instagram/Facebook/TikTok transforme en site 3 pages",
    price: 99,
    originalPrice: 199,
    unit: "",
    badge: "Innovation",
    badgeColor: "bg-pink-500",
    features: [
      "Import automatique du contenu",
      "Design base sur votre identite",
      "Liens vers vos reseaux",
      "SEO optimise",
      "Formation utilisation",
    ],
    color: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-500/10",
    highlight: false,
  },
  {
    id: "vitrine-marche",
    category: "micro",
    icon: Tag,
    title: "Vitrine Marche de FDF",
    description: "Site 1 page + QR Code pour votre stand au marche",
    price: 49,
    originalPrice: 99,
    unit: "/an",
    badge: "Commercants",
    badgeColor: "bg-teal-500",
    features: [
      "Presentation de vos produits",
      "QR Code pour stand",
      "Coordonnees et horaires",
      "Photos produits",
      "Sous-domaine inclus",
    ],
    color: "from-teal-500 to-cyan-600",
    bgGlow: "bg-teal-500/10",
    highlight: false,
  },
  {
    id: "cv-pro",
    category: "micro",
    icon: Briefcase,
    title: "CV Pro Augmente",
    description: "Site CV moderne avec portfolio et liens professionnels",
    price: 19,
    originalPrice: 49,
    unit: "/an",
    badge: "Emploi",
    badgeColor: "bg-slate-600",
    features: [
      "Design professionnel",
      "Portfolio integre",
      "Liens LinkedIn/reseaux",
      "Telechargement PDF",
      "QR Code partage",
    ],
    color: "from-slate-500 to-slate-700",
    bgGlow: "bg-slate-500/10",
    highlight: false,
  },
  {
    id: "fiche-produit",
    category: "micro",
    icon: TrendingUp,
    title: "Fiche Produit Boostee",
    description: "Page dediee SEO pour mettre en avant un produit phare",
    price: 29,
    originalPrice: 79,
    unit: "",
    badge: "SEO",
    badgeColor: "bg-orange-500",
    features: [
      "Page produit optimisee",
      "SEO avance",
      "Call-to-action",
      "Analytics",
      "Partage social",
    ],
    color: "from-orange-500 to-red-600",
    bgGlow: "bg-orange-500/10",
    highlight: false,
  },
  {
    id: "ecommerce",
    category: "premium",
    icon: CreditCard,
    title: "E-commerce 10 produits",
    description: "Boutique en ligne complete avec paiement securise",
    price: 449,
    originalPrice: 1000,
    unit: "",
    badge: "Pro",
    badgeColor: "bg-indigo-600",
    features: [
      "10 fiches produits",
      "Paiement Stripe/PayPal",
      "Gestion des stocks",
      "Frais de port configures",
      "Dashboard vendeur",
    ],
    color: "from-indigo-600 to-purple-700",
    bgGlow: "bg-indigo-600/10",
    highlight: false,
  },
]

const benefits = [
  {
    icon: CreditCard,
    title: "Paiement 4x sans frais",
    description: "Des 99EUR, payez en 4 fois sans frais",
  },
  {
    icon: Gift,
    title: "Sous-domaine offert",
    description: "votre-site.plistech.com / votre-site.teknopy.com",
  },
  {
    icon: Clock,
    title: "Sous-domaine 6 mois",
    description: "Gratuit pour demarrer, puis 9EUR/mois",
  },
  {
    icon: Phone,
    title: "Deplacement offert",
    description: "1er RDV gratuit a Fort-de-France",
  },
]

export function PromosPageContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  // Sort all offers by price ascending
  const sortedOffers = [...allOffers].sort((a, b) => a.price - b.price)
  
  // Filter by category
  const filteredOffers = activeCategory === "all" 
    ? sortedOffers 
    : sortedOffers.filter(o => o.category === activeCategory)
  
  const highlightedOffers = filteredOffers.filter(o => o.highlight)
  const otherOffers = filteredOffers.filter(o => !o.highlight)

  return (
    <div className="relative">
      {/* Hero section with warm gradient */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-amber-950/30 dark:via-slate-900 dark:to-emerald-950/30" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-amber-900/40 dark:to-emerald-900/40 mb-6">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">OFFRES EXCLUSIVES MARTINIQUE</span>
              <Sparkles className="h-5 w-5 text-emerald-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary via-amber-600 to-emerald-600 bg-clip-text text-transparent">
                Promos & Nouveautes
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Des tarifs imbattables pour lancer votre presence digitale. 
              Site vitrine a partir de <span className="font-bold text-primary">99EUR</span>, 
              offres associatives a <span className="font-bold text-emerald-600">19EUR/an</span>.
            </p>

            {/* Benefits bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md border border-amber-200/30 dark:border-amber-700/20"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-900/40 dark:to-emerald-900/40">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-center">{benefit.title}</span>
                  <span className="text-xs text-muted-foreground text-center">{benefit.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar - NOT sticky */}
      <section className="py-6 bg-white dark:bg-slate-900 border-b">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-primary to-emerald-600 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                <cat.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted offers */}
      <section className="py-12 md:py-16 relative">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {highlightedOffers.length > 0 && (
            <div className="text-center mb-8 md:mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-primary text-white border-0">
                <Heart className="h-3 w-3 mr-1" /> Coups de Coeur
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">Nos Offres Phares</h2>
            </div>
          )}

          {highlightedOffers.length > 0 && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {highlightedOffers.map((offer) => (
              <Card
                key={offer.id}
                id={offer.id}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-mt-32 flex flex-col h-full"
              >
                {/* Gradient border effect */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity -z-10", offer.color)} />
                <div className="absolute inset-[2px] bg-white dark:bg-slate-900 rounded-xl" />
                
                {/* Glow */}
                <div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl", offer.bgGlow)} />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={cn("text-white border-0 shadow-lg", offer.badgeColor)}>
                    {offer.badge}
                  </Badge>
                </div>

                <CardContent className="relative p-6 pt-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", offer.color)}>
                    <offer.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 min-h-[56px]">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{offer.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className={cn("text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", offer.color)}>
                      {offer.price}EUR
                    </span>
                    <span className="text-sm text-muted-foreground">{offer.unit}</span>
                    <span className="text-lg text-slate-400 line-through ml-2">
                      {offer.originalPrice}EUR
                    </span>
                  </div>

                  {/* Features - flex-1 to push button to bottom */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={cn("h-4 w-4 mt-0.5 flex-shrink-0", 
                          offer.id === "site-vitrine" ? "text-primary" :
                          offer.id === "restaurant" ? "text-amber-500" :
                          offer.id === "association" ? "text-emerald-500" : "text-violet-500"
                        )} />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA - always at bottom */}
                  <Button asChild className={cn("w-full bg-gradient-to-r hover:opacity-90 shadow-lg mt-auto", offer.color)}>
                    <Link href="/contact" className="gap-2">
                      Commander
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Other offers */}
      {otherOffers.length > 0 && (
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Toutes nos Offres</h2>
            <p className="text-muted-foreground">Solutions adaptees a chaque besoin et budget</p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {otherOffers.map((offer) => (
              <Card
                key={offer.id}
                id={offer.id}
                className="group hover:shadow-xl transition-all duration-300 scroll-mt-32 flex flex-col h-full"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md", offer.color)}>
                      <offer.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={cn("text-white border-0", offer.badgeColor)}>
                      {offer.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4 min-h-[28px]">{offer.title}</CardTitle>
                  <p className="text-sm text-muted-foreground min-h-[40px]">{offer.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={cn("text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent", offer.color)}>
                      {offer.price}EUR
                    </span>
                    <span className="text-sm text-muted-foreground">{offer.unit}</span>
                    <span className="text-sm text-slate-400 line-through">
                      {offer.originalPrice}EUR
                    </span>
                  </div>

                  {/* Features - flex-1 to push button to bottom */}
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {offer.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-r flex-shrink-0", offer.color)} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all mt-auto">
                    <Link href="/contact">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Programme Partenaire */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-amber-500/5 to-emerald-500/5" />
        
        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-primary text-white border-0">
                <Gift className="h-3 w-3 mr-1" /> Programme Fideline
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Programme Partenaire</h2>
              <p className="text-muted-foreground">
                Demarrez avec un sous-domaine gratuit 6 mois et evoluez vers des avantages exclusifs
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              {[
                { level: "Starter", condition: "Inscription", reward: "Sous-domaine 6 mois offert", color: "bg-slate-100 border-slate-300" },
                { level: "Actif", condition: "6 mois actif", reward: "-5% prochaine commande", color: "bg-amber-50 border-amber-300" },
                { level: "Premium", condition: "Site premium", reward: "-10% prochaine commande", color: "bg-emerald-50 border-emerald-300" },
                { level: "Bronze", condition: "5 recommandations", reward: "Maintenance 9EUR/mois", color: "bg-orange-50 border-orange-300" },
                { level: "Gold", condition: "20 recommandations", reward: "App Mobile offerte", color: "bg-amber-100 border-amber-400" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={cn("p-4 rounded-xl border-2 text-center", item.color)}
                >
                  <div className="text-xs text-muted-foreground mb-1">Niveau {index + 1}</div>
                  <div className="font-bold text-lg mb-2">{item.level}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.condition}</div>
                  <div className="text-sm font-medium text-primary">{item.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-emerald-600 to-primary text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pret a lancer votre projet ?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit sous 24h. Premier rendez-vous offert a Fort-de-France.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="shadow-xl">
              <Link href="/contact" className="gap-2">
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:+596696617151" className="gap-2">
                <Phone className="h-5 w-5" />
                +596 696 617 151
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
