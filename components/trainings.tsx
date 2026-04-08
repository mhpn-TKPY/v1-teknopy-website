import Image from "next/image"
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
    <section id="formations" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Formations
          </h2>
          <p className="text-muted-foreground">
            Des cours particuliers adaptés à vos besoins, dispensés par un formateur expérimenté.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {trainings.map((training) => (
            <Card key={training.title} className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={training.image}
                  alt={training.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain bg-secondary/20"
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
