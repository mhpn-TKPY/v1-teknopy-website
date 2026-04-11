import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromosPageContent } from "@/components/promos-page-content"

export const metadata: Metadata = {
  title: "Offres & Promos | Site Vitrine 99EUR - Menu Restaurant 79EUR",
  description: "Offres exclusives TEKNOPY en Martinique. Site vitrine 3 pages 99EUR, Menu Restaurant Digital 79EUR/an, Offre Associatif 19EUR/an, Pack Influenceur 149EUR. Paiement 4x sans frais.",
  keywords: [
    "promo site web martinique",
    "site vitrine pas cher martinique",
    "menu restaurant digital martinique",
    "site association martinique",
    "pack influenceur martinique",
    "teknopy promos",
  ],
  openGraph: {
    title: "Offres & Promos TEKNOPY | Site Web des 99EUR en Martinique",
    description: "Offres exclusives: Site vitrine 99EUR, Menu Restaurant 79EUR, Offre Associatif 19EUR/an. Paiement 4x sans frais.",
  },
}

export default function PromosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PromosPageContent />
      </main>
      <Footer />
    </div>
  )
}
