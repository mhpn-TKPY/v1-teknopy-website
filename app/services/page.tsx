import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Skills } from "@/components/skills"
import { HomepageCTA } from "@/components/homepage-cta"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Services | Développement Web, Mobile, Formations & IT",
  description: "Nos services : création de sites web vitrines et e-commerce, applications web et mobiles, formations informatique et mathématiques, réparation PC à Fort-de-France.",
  keywords: [
    "services agence web martinique",
    "développement web fort-de-france",
    "création site internet martinique",
    "application mobile martinique",
    "consulting IT martinique",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services TEKNOPY | Développement Web & IT en Martinique",
    description: "Création de sites web, applications, formations et consulting IT. Découvrez tous nos services.",
    url: "https://teknopy.com/services",
  },
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Services />
        <Skills />
        <HomepageCTA />
      </main>
      <Footer />
    </div>
  )
}
