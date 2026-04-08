import { Clock, Users, MapPin, Euro } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const trainings = [
  {
    title: "Initiation Informatique",
    description: "Initiation et apprentissage en informatique: périphériques, logiciels bureautiques, sécurité web, et introduction au code (HTML, CSS, JavaScript).",
    price: "20€/heure",
    schedule: "Lun-Sam 10H-21H",
    location: "Fort-de-France",
    maxStudents: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Affiche%20Cours%20Info%20boncoin-ikcRMtlCDGbrhqba0zj3Bs9hqkr8Cm.jpg",
    topics: ["Périphériques", "Bureautique", "Sécurité web", "HTML/CSS/JS"],
  },
  {
    title: "Cours de Mathématiques",
    description: "Cours individualisés de mathématiques pour adultes en formation et élèves de la 6e à la 2nd. Renforcement scolaire et préparation au Brevet.",
    price: "20€/heure",
    schedule: "Lun-Sam 10H-21H",
    location: "Fort-de-France",
    maxStudents: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Affiche%20Cours%20Maths-MdngmHhpvPjt21uzS8mXMdL6PySRRz.jpg",
    topics: ["Niveau 6e-2nd", "Brevet des Collèges", "Adultes en formation"],
    package: "Forfait 6H/semaine: 2x3H ou 3x2H",
  },
]

export function Trainings() {
  return (
    <section id="formations" className="py-10 md:py-14 lg:py-16" aria-labelledby="formations-heading">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="mb-2 inline-block text-sm font-medium text-primary">TEKNOPY Formation</span>
          <h2 id="formations-heading" className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Formations Informatique & Mathématiques
          </h2>
          <p className="text-muted-foreground">
            Des cours particuliers à Fort-de-France adaptés à vos besoins, dispensés par un formateur expérimenté à 20€/heure.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {trainings.map((training) => (
            <Card key={training.title} className="overflow-hidden">
              <div className="relative h-48 w-full bg-secondary/20 md:h-56 lg:h-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={training.image}
                  alt={training.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{training.title}</CardTitle>
                  <Badge className="bg-primary text-lg font-semibold">
                    {training.price}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {training.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {training.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
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
                  <div className="mb-4 rounded-lg bg-accent/10 p-3 text-sm text-accent-foreground">
                    <strong>Forfait disponible:</strong> {training.package}
                  </div>
                )}

                <Button asChild className="w-full">
                  <a href="#contact">Réserver un cours</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
