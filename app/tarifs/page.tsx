import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Tarifs | Grille Tarifaire Web, Formations & Réparations",
  description: "Découvrez nos tarifs transparents : sites web dès 400€, e-commerce dès 1000€, formations à 20€/h, réparations PC. Devis gratuit sous 24h en Martinique.",
  keywords: [
    "tarif site web martinique",
    "prix création site internet martinique",
    "tarif développeur web fort-de-france",
    "prix formation informatique martinique",
    "tarif réparation PC martinique",
  ],
  alternates: {
    canonical: "/tarifs",
  },
  openGraph: {
    title: "Tarifs TEKNOPY Concept | Grille Tarifaire Complète",
    description: "Sites web dès 400€, e-commerce dès 1000€, formations à 20€/h. Tarifs clairs et compétitifs en Martinique.",
    url: "https://teknopy.com/tarifs",
  },
}

export default function TarifsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
