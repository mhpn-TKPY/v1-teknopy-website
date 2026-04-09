import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ProjectsPage } from "@/components/projects-page"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Projets | Portfolio de Réalisations Web en Martinique",
  description: "Découvrez nos réalisations : sites vitrines, e-commerce, applications web et mobiles développés pour nos clients en Martinique. Portfolio complet de TEKNOPY Concept.",
  keywords: [
    "portfolio web martinique",
    "réalisations site web martinique",
    "projets développement web fort-de-france",
    "références agence web martinique",
  ],
  alternates: {
    canonical: "/projets",
  },
  openGraph: {
    title: "Portfolio TEKNOPY | Nos Réalisations Web",
    description: "Sites vitrines, e-commerce, applications web et mobiles. Découvrez nos projets réalisés en Martinique.",
    url: "https://teknopy.com/projets",
  },
}

export default function ProjetsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProjectsPage />
      </main>
      <Footer />
    </div>
  )
}
