import Link from "next/link"
import { ArrowRight, Globe, Code2, Smartphone, GraduationCap, Wrench, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    icon: Globe,
    title: "Sites Web Vitrine",
    description: "Sites professionnels et responsives pour présenter votre activité.",
    price: "À partir de 400€",
    href: "/tarifs",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutiques en ligne complètes avec paiement sécurisé.",
    price: "À partir de 1000€",
    href: "/tarifs",
  },
  {
    icon: Code2,
    title: "Applications Web",
    description: "Applications métier personnalisées avec espace client.",
    price: "À partir de 1500€",
    href: "/tarifs",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description: "Applications iOS et Android cross-platform.",
    price: "À partir de 1200€",
    href: "/tarifs",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description: "Cours d'informatique et mathématiques personnalisés.",
    price: "20€/heure",
    href: "/formations",
  },
  {
    icon: Wrench,
    title: "Réparation PC",
    description: "Diagnostic, dépannage et maintenance informatique.",
    price: "À partir de 20€",
    href: "/tarifs",
  },
]

export function ServicesPreview() {
  return (
    <section id="services" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Nos Services</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Des solutions complètes pour votre présence numérique
          </h2>
          <p className="text-muted-foreground text-pretty">
            Du site vitrine à l&apos;application mobile, en passant par les formations et le dépannage informatique.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{service.price}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/tarifs">
              Voir tous nos tarifs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
