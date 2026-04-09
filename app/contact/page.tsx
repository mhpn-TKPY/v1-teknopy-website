import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ContactPage } from "@/components/contact-page"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact | Demandez un Devis Gratuit",
  description: "Contactez TEKNOPY Concept pour un devis gratuit sous 24h. Téléphone : +596 696 617 151. Email : contact@plistech.com. Fort-de-France, Martinique.",
  keywords: [
    "contact agence web martinique",
    "devis site web martinique",
    "contact développeur fort-de-france",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contactez TEKNOPY | Devis Gratuit sous 24h",
    description: "Demandez un devis gratuit pour votre projet web. Réponse garantie sous 24 heures.",
    url: "https://teknopy.com/contact",
  },
}

export default function ContactPageRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
    </div>
  )
}
