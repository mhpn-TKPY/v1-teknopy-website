import { 
  Globe, 
  Code2, 
  Smartphone, 
  ShoppingCart, 
  BookOpen, 
  Wrench,
  Check,
  BadgeCheck,
  Sparkles,
  Shield,
  Clock,
  Gift
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const webServices = [
  {
    id: "vitrine",
    icon: Globe,
    title: "Site Web Vitrine",
    description: "Site responsive 1-5 pages pour présenter votre activité",
    price: 400,
    popular: false,
    features: [
      "Design responsive 1-5 pages",
      "Formulaire de contact",
      "Mentions légales incluses",
      "SEO de base",
      "Compatible mobile & tablette",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "Site E-commerce",
    description: "Boutique en ligne avec paiement sécurisé",
    price: 1000,
    popular: true,
    features: [
      "Intégration de 10 produits",
      "Paiement sécurisé (Stripe/PayPal)",
      "Gestion des frais de port DOM-TOM",
      "Tableau de bord vendeur",
      "Notifications de commande",
    ],
  },
  {
    id: "webapp",
    icon: Code2,
    title: "Application Web",
    description: "Backend simple avec espace client personnalisé",
    price: 1500,
    popular: false,
    features: [
      "Espace client sécurisé",
      "Tableau de bord personnalisé",
      "Authentification utilisateur",
      "Connexion base de données",
      "API REST incluse",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Application Mobile",
    description: "Application cross-platform iOS & Android",
    price: 1200,
    popular: false,
    features: [
      "Application React Native",
      "Compatible iOS & Android",
      "2 à 3 écrans principaux",
      "Notifications push",
      "Design adaptatif",
    ],
  },
]

const blogModule = {
  title: "Module Blog Premium",
  description: "Ajoutez un système d'abonnement et de contenu premium à votre site",
  price: 200,
  note: "en sus du site",
  features: [
    "Système d'abonnement intégré",
    "Paywall sécurisé (Stripe)",
    "Gestion des niveaux d'accès",
    "Membre Gratuit / Premium",
  ],
}

const formationServices = [
  {
    title: "Formation Informatique (Particulier)",
    description: "Cours à domicile: initiation, bureautique, code",
    price: 20,
    unit: "/ heure",
    note: "selon déplacement",
  },
  {
    title: "Formation Mathématiques (Particulier)",
    description: "Cours individuels de la 6e à la 2nd, adultes",
    price: 20,
    unit: "/ heure",
    note: "tarif plancher",
  },
  {
    title: "Formation Intra-Entreprise",
    description: "Session de 2h minimum, jusqu'à 5 personnes",
    price: 100,
    unit: "forfait groupe",
    note: "sur site client",
  },
]

const repairServices = [
  {
    title: "Diagnostic Matériel",
    description: "Rapport de panne complet",
    price: 20,
    note: "Offert si réparation acceptée",
    highlight: true,
  },
  {
    title: "Nettoyage/Optimisation PC",
    description: "Nettoyage physique + optimisation logicielle",
    price: 30,
    note: null,
    highlight: false,
  },
  {
    title: "Dépannage Logiciel",
    description: "Virus, drivers, configuration réseau",
    price: 30,
    note: null,
    highlight: false,
  },
  {
    title: "Installation Windows/Drivers",
    description: "Formatage, OS, drivers, logiciels essentiels",
    price: 50,
    note: null,
    highlight: false,
  },
  {
    title: "Récupération de Données",
    description: "Sur disque fonctionnel (suppression accidentelle)",
    price: 50,
    note: null,
    highlight: false,
  },
  {
    title: "Remplacement Composant (RAM, SSD)",
    description: "Main d'oeuvre uniquement",
    price: 30,
    note: "pièce non fournie",
    highlight: false,
  },
  {
    title: "Remplacement Écran (Laptop)",
    description: "Intervention sur PC portable",
    price: 50,
    note: "pièce non fournie",
    highlight: false,
  },
]

const guarantees = [
  {
    icon: Gift,
    title: "Devis 100% Gratuit",
    description: "Estimation détaillée sans engagement sous 24h",
  },
  {
    icon: BadgeCheck,
    title: "Diagnostic Remboursé",
    description: "30€ déduits de la facture si réparation acceptée",
  },
  {
    icon: Shield,
    title: "Engagement de Prix",
    description: "Respect des tarifs minimaux affichés",
  },
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Nous vous recontactons rapidement",
  },
]

function PriceTag({ price, unit, className = "" }: { price: number; unit?: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className="text-3xl font-bold text-primary">{price}€</span>
      {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
    </div>
  )
}

export function Pricing() {
  return (
    <section id="tarifs" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Transparence totale
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Grille Tarifaire Complète
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Des tarifs clairs et compétitifs, adaptés au marché martiniquais. 
            Devis gratuit et détaillé pour tous vos projets.
          </p>
        </div>

        {/* Guarantees Banner */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((guarantee) => (
            <div
              key={guarantee.title}
              className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <guarantee.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{guarantee.title}</h3>
                <p className="text-sm text-muted-foreground">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="web" className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="web" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Web & Dev</span>
              <span className="sm:hidden">Web</span>
            </TabsTrigger>
            <TabsTrigger value="formation" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Formations</span>
              <span className="sm:hidden">Cours</span>
            </TabsTrigger>
            <TabsTrigger value="reparation" className="gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Réparations</span>
              <span className="sm:hidden">Répar.</span>
            </TabsTrigger>
          </TabsList>

          {/* Web & Development Tab */}
          <TabsContent value="web" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {webServices.map((service) => (
                <Card 
                  key={service.id} 
                  className={`relative flex flex-col transition-all hover:shadow-lg ${
                    service.popular ? "border-primary shadow-md" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground shadow-sm">
                        Populaire
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="min-h-[40px]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">À partir de</span>
                      <PriceTag price={service.price} />
                    </div>
                    <ul className="mb-6 flex-1 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={service.popular ? "default" : "outline"} className="w-full">
                      <a href="#contact">Demander un devis</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Blog Premium Module */}
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{blogModule.title}</h3>
                    <p className="text-sm text-muted-foreground">{blogModule.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {blogModule.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-accent">+{blogModule.price}€</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{blogModule.note}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formation Tab */}
          <TabsContent value="formation" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {formationServices.map((service) => (
                <Card key={service.title} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <PriceTag price={service.price} unit={service.unit} />
                      {service.note && (
                        <p className="mt-1 text-xs text-muted-foreground">({service.note})</p>
                      )}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <a href="#contact">Réserver un cours</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Formation Info Box */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Forfait disponible</h3>
                    <p className="text-sm text-muted-foreground">
                      Forfait 6H/semaine: 2x3H ou 3x2H - Idéal pour un suivi régulier
                    </p>
                  </div>
                  <Button asChild>
                    <a href="#contact">En savoir plus</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Réparation Tab */}
          <TabsContent value="reparation" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {repairServices.map((service) => (
                <Card 
                  key={service.title} 
                  className={`transition-all hover:shadow-md ${
                    service.highlight ? "border-primary/40 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Wrench className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">{service.price}€</span>
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    {service.note && (
                      <Badge 
                        variant={service.highlight ? "default" : "secondary"} 
                        className="mt-3 text-xs"
                      >
                        {service.note}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Repair Info Box */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-6 w-6 text-accent" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Diagnostic 30€ remboursé sur facture</h3>
                      <p className="text-sm text-muted-foreground">
                        Si vous acceptez la réparation dans les 7 jours, le diagnostic est entièrement déduit de votre facture.
                      </p>
                    </div>
                  </div>
                  <Button asChild>
                    <a href="#contact">Demander un diagnostic</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
          <h3 className="mb-3 text-2xl font-bold text-foreground md:text-3xl text-balance">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Obtenez un devis gratuit et détaillé sous 24h. Nous nous engageons à respecter les tarifs minimaux affichés, 
            sans frais cachés ni mauvaises surprises.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href="#contact">
                Demander un devis gratuit
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+596696617151">
                Appeler maintenant
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
