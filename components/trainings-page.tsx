import Image from "next/image"
import Link from "next/link"
import { 
  Clock, 
  Users, 
  MapPin, 
  Euro, 
  CheckCircle, 
  BookOpen, 
  GraduationCap,
  Calculator,
  Monitor,
  Shield,
  Code2,
  Building2,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const trainings = [
  {
    id: "informatique",
    title: "Initiation Informatique",
    description: "Initiation et apprentissage en informatique: périphériques, logiciels bureautiques, sécurité web, et introduction au code (HTML, CSS, JavaScript).",
    price: "20€/heure",
    schedule: "Lun-Sam 10H-21H",
    location: "Fort-de-France",
    maxStudents: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Affiche%20Cours%20Info%20boncoin-ikcRMtlCDGbrhqba0zj3Bs9hqkr8Cm.jpg",
    topics: [
      { icon: Monitor, label: "Périphériques & systèmes" },
      { icon: BookOpen, label: "Bureautique (Word, Excel)" },
      { icon: Shield, label: "Sécurité web" },
      { icon: Code2, label: "HTML/CSS/JavaScript" },
    ],
    benefits: [
      "Cours adaptés à votre niveau",
      "Exercices pratiques",
      "Support pédagogique inclus",
      "Suivi personnalisé",
    ],
  },
  {
    id: "mathematiques",
    title: "Cours de Mathématiques",
    description: "Cours individualisés de mathématiques pour adultes en formation et élèves de la 6e à la 2nd. Renforcement scolaire et préparation au Brevet.",
    price: "20€/heure",
    schedule: "Lun-Sam 10H-21H",
    location: "Fort-de-France",
    maxStudents: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Affiche%20Cours%20Maths-MdngmHhpvPjt21uzS8mXMdL6PySRRz.jpg",
    topics: [
      { icon: GraduationCap, label: "Niveau 6e à 2nd" },
      { icon: Calculator, label: "Préparation Brevet" },
      { icon: Users, label: "Adultes en formation" },
      { icon: BookOpen, label: "Renforcement scolaire" },
    ],
    benefits: [
      "Méthode pédagogique éprouvée",
      "Exercices progressifs",
      "Préparation aux examens",
      "Confiance retrouvée",
    ],
    package: "Forfait 6H/semaine: 2x3H ou 3x2H",
  },
]

const enterpriseTraining = {
  title: "Formation Intra-Entreprise",
  description: "Sessions de formation sur mesure pour vos équipes. Bureautique, outils collaboratifs, sécurité informatique, et plus encore.",
  price: "100€",
  priceNote: "forfait groupe (2h min, jusqu'à 5 pers.)",
  features: [
    "Formation sur site client",
    "Programme personnalisé",
    "Jusqu'à 5 participants",
    "Attestation de formation",
    "Support post-formation",
  ],
}

const stats = [
  { value: "100+", label: "Heures de cours dispensées" },
  { value: "20€", label: "Tarif horaire unique" },
  { value: "4", label: "Élèves max par session" },
  { value: "98%", label: "Satisfaction clients" },
]

export function TrainingsPage() {
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
              <GraduationCap className="mr-1 h-3 w-3" />
              Formations à Fort-de-France
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Cours Particuliers{" "}
              <span className="text-primary">Informatique & Mathématiques</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
              Des cours adaptés à votre niveau et à vos objectifs, dispensés par un formateur expérimenté à Fort-de-France.
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

      {/* Training Cards Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {trainings.map((training) => (
              <Card key={training.id} className="overflow-hidden">
                <div className="relative h-56 w-full md:h-64">
                  <Image
                    src={training.image}
                    alt={training.title}
                    fill
                    className="object-contain bg-secondary/20"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl">{training.title}</CardTitle>
                    <Badge className="bg-primary text-lg font-semibold">
                      {training.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {training.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Topics */}
                  <div>
                    <h3 className="mb-3 font-semibold text-foreground">Programme</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {training.topics.map((topic) => (
                        <div key={topic.label} className="flex items-center gap-2 text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <topic.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{topic.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="mb-3 font-semibold text-foreground">Avantages</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {training.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 rounded-lg bg-secondary/30 p-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      {training.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {training.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      Max {training.maxStudents} personnes
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Euro className="h-4 w-4 text-primary" />
                      {training.price}
                    </div>
                  </div>

                  {training.package && (
                    <div className="rounded-lg bg-accent/10 p-4 text-sm">
                      <strong className="text-accent-foreground">Forfait disponible:</strong>{" "}
                      <span className="text-muted-foreground">{training.package}</span>
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <Link href="/contact">Réserver un cours</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Training Section */}
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-card">
            <CardContent className="p-6 md:p-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                    {enterpriseTraining.title}
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    {enterpriseTraining.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">{enterpriseTraining.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground">({enterpriseTraining.priceNote})</span>
                  </div>
                  <Button asChild size="lg">
                    <Link href="/contact" className="gap-2">
                      Demander un devis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <ul className="space-y-3">
                    {enterpriseTraining.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl text-balance">
              Prêt à progresser ?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Réservez votre premier cours et bénéficiez d&apos;un accompagnement personnalisé adapté à vos objectifs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Réserver un cours</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+596696617151">Appeler maintenant</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
