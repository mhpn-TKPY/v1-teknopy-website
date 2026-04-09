import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomepageCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary/10 p-8 text-center md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl text-balance">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-pretty">
            Obtenez un devis gratuit et détaillé sous 24h. Nous nous engageons à respecter les tarifs affichés, 
            sans frais cachés ni mauvaises surprises.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="tel:+596696617151">
                <Phone className="h-4 w-4" />
                +596 696 617 151
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
